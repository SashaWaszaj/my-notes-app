import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NotesList from "./NotesList";
import "../Styles-CSS/CreateNoteForm.css";
import pacmanGif from "../assets/pacman.gif";

const CreateNoteForm = () => {
    const [note, setNote] = useState({ title: '', content: '', categories: [] });
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/category/categories-all');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === 'categories') {
            // Handle checkbox for selecting categories
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
        setError(null);
        setSuccess(null);
        try {
            const response = await axios.post('http://localhost:8080/note/new', note);
            if (response.status === 201) {
                setNote({ title: '', content: '', categories: [] });
                setSuccess("Note created successfully");
                navigate('/');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Unexpected error occurred.');
        }
    };

    const handleCancel = () => {
        navigate("/home");
    };

    return (
        <div className="desktop-display">
            <NotesList/>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2 className="titulo-secundario" style={{color: "#00def5"}}>Add New Note</h2>
                <div className="input-container">
                    <label htmlFor="title"></label>
                    <input style={{ width:"300px" }}
                    placeholder="Title..."
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
                        placeholder="Write something..."
                        type="text"
                        id="content"
                        name="content"
                        value={note.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <h4>Tags:</h4>
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
                <button type="submit" className="button-3">Add Note</button>
                <button type="button" className="button-3" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}
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

export default CreateNoteForm;

