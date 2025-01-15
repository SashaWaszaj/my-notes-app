import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NotesList from './NotesList';
import pacmanGif from "../assets/pacman.gif";

const EditNotesForm = () => {
  const [note, setNote] = useState({
    title: '',
    content: '',
    categories: [] // To store selected categories
  });
  const [categories, setCategories] = useState([]); // To store all available categories
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [newCategory, setNewCategory] = useState('');

  // Fetch note details
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await Axios.get(`http://localhost:8080/note/${id}`);
        const noteData = response.data;
        setNote({
          ...noteData,
          categories: noteData.categories || [] // Set current categories if available
        });
      } catch (error) {
        setError('Error fetching note details.');
      }
    };

    fetchNote();
  }, [id]);

  // Fetch available categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axios.get('http://localhost:8080/category/categories-all');
        setCategories(response.data);
      } catch (error) {
        setError('Error fetching categories.');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'categories') {
      // If category checkbox is checked or unchecked, update the categories array
      setNote((prevNote) => {
        const newCategories = checked
          ? [...prevNote.categories, value]
          : prevNote.categories.filter((category) => category !== value);
        return { ...prevNote, categories: newCategories };
      });
    } else {
      setNote({ ...note, [name]: value });
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() === '') return;
    try {
        const response = await axios.post('http://localhost:8080/category/new', { name: newCategory });
        setCategories([...categories, response.data]); // Add the new category to the list
        setNote((prevNote) => ({
            ...prevNote,
            categories: [...prevNote.categories, response.data._id] // Add the category ID to the note
        }));
        setNewCategory(''); // Clear the input field for the new category
    } catch (error) {
        console.error("Error adding category", error);
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`http://localhost:8080/note/${id}/edit`, note);
      navigate('/'); 
    } catch (error) {
      setError('Error updating note. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/'); 
  };

  return (
    <div className="desktop-display">
            <NotesList/>
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="title" style={{color: "#00def5"}}>Edit Note</h2>
        
        <div className="input-container">
          <label htmlFor="title"></label>
          <input style={{ width:"300px" }}
            type="text" 
            id="title" 
            name="title" 
            value={note.title} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-container">
          <label htmlFor="content"></label>
          <input style={{ height:"100px", width:"300px"}}
            type="text" 
            id="content" 
            name="content" 
            value={note.content} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-container">
          <h3>Tags</h3>
          {categories.map((category) => (
            <div key={category._id}>
              <input
                type="checkbox"
                name="categories"
                value={category._id}
                checked={note.categories.includes(category._id)}
                onChange={handleChange}
              />
              <label>{category.name}</label>
            </div>
          ))}
        </div>
        <div className="input-container-tag">
            <label htmlFor="new-category"></label>
                <input
                  placeholder="Create tag"
                  type="text"
                  id="new-category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <button className="button-2" type="button" onClick={handleAddCategory}>
                  Add Tag
                </button>
        </div>

        <button className="button-3" role="button" type="submit">Update Note</button>
        <button className="button-3" role="button" type="button" onClick={handleCancel}>Cancel</button>
        
        <div>{error}</div>
      </form>
    </div>
      <div>
          <img src={ pacmanGif } alt="pacman" 
              style={{
              transform: 'rotate(90deg)', 
              width: '500px', 
              height: 'auto', 
              marginTop:"300px"}}/>
      </div>
    </div>
  );
};

export default EditNotesForm;
