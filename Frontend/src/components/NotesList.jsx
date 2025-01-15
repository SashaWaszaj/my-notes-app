import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../Styles-CSS/NotesList.css";

const NotesList = () => {
  const [allNotes, setAllNotes] = useState([]); // Estado para todas las notas originales
  const [notes, setNotes] = useState([]); // Notas visibles en la lista activa
  const [archivedNotes, setArchivedNotes] = useState([]); // Notas archivadas
  const [categories, setCategories] = useState([]); // Categorías disponibles
  const [selectedCategory, setSelectedCategory] = useState(''); // Categoría seleccionada para filtrar
  const [selectedTab, setSelectedTab] = useState('active'); // Tab seleccionada (notas activas o archivadas)
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllNotes();
    getCategories();
  }, []);

  // Obtener todas las notas
  const getAllNotes = async () => {
    try {
      const URL = "http://localhost:8080/note/";
      const response = await axios.get(URL);
      const data = response.data;
      setAllNotes(data); // Guardar todas las notas
      setNotes(data.filter(note => !note.isArchived)); // Filtrar las notas activas
      setArchivedNotes(data.filter(note => note.isArchived)); // Filtrar las notas archivadas
    } catch (error) {
      console.log("Error getting notes", error);
      setError(error.response?.statusText);
    }
  };

  // Obtener todas las categorías
  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/category/categories-all");
      setCategories(response.data);
    } catch (error) {
      console.log("Error fetching categories", error);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category) {
      // Filtrar las notas activas por categoría
      const filteredNotes = allNotes.filter(
        note => !note.isArchived && note.categories.some(cat => cat._id === category)
      );
      setNotes(filteredNotes);

      // Filtrar las notas archivadas por categoría
      const filteredArchivedNotes = allNotes.filter(
        note => note.isArchived && note.categories.some(cat => cat._id === category)
      );
      setArchivedNotes(filteredArchivedNotes);
    } else {
      // Mostrar todas las notas si no hay categoría seleccionada
      setNotes(allNotes.filter(note => !note.isArchived));
      setArchivedNotes(allNotes.filter(note => note.isArchived));
    }
  };

  const archiveNote = (note) => {
    setArchivedNotes([...archivedNotes, note]); 
    setNotes(notes.filter((n) => n._id !== note._id)); 
  };

  const unarchiveNote = (note) => {
    setNotes([...notes, note]); 
    setArchivedNotes(archivedNotes.filter((n) => n._id !== note._id)); 
  };

  const deleteNote = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this note permanently?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/note/${id}/delete`);
        getAllNotes(); // Recargar todas las notas después de eliminar
      } catch (error) {
        setError(error.response?.data?.message);
      }
    }
  };

  return (
    <div className='list-main-container'>
      <div className="list">
        <h2 ><Link to="/" className='my-notes-title'>My Notes App</Link></h2>
                <div style={{ textAlign: "center" }}>
                    <button className='add-note-button'><Link to="/new-note"> + Add Note </Link> </button>
                </div>

        {/* Tabs for Active and Archived Notes */}
        <div className='active-archive-button-container'>
          <button
            onClick={() => setSelectedTab('active')}
            className={`tab-button ${selectedTab === 'active' ? 'active' : ''}`}
          >
            Active Notes
          </button>
          <button
            onClick={() => setSelectedTab('archived')}
            className={`tab-button ${selectedTab === 'archived' ? 'active' : ''}`}
          >
            Archived Notes
          </button>
        </div>

        {/* Filter by Category */}
        <div>
          <label htmlFor="categoryFilter" className='filter-label'>Filter by Category:</label>
          <select id="categoryFilter" value={selectedCategory} onChange={handleCategoryChange}>
            <option style={{ fontFamily: "monospace" }} value="">All Categories</option>
            {categories.map((category) => (
              <option style={{ fontFamily: "monospace" }} key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>


        {/* Display notes based on selected tab */}
        <div className="grid">
          {selectedTab === 'active' ? (
            notes.map((note) => (
              <div key={note._id} className="box">
                <div>
                  <div className='title-buttons-container'>
                  <div>
                  <h4 className="title-note">{note.title}</h4>
                  </div>
                  <div className='buttons-container'>
                  <button
                    onClick={() => navigate(`/${note._id}/edit`)}
                    className="button-14"
                    role="button"
                  >
                    <i className="fa fa-pencil" aria-hidden="true" style={{ color: "white" }}></i>
                  </button>
                  <button
                    onClick={() => archiveNote(note)}
                    className="button-14"
                    role="button"
                  >
                    <i className="fa fa-archive" aria-hidden="true" style={{ color: "white" }}></i>
                  </button>
                  <button
                    onClick={() => deleteNote(note._id)}
                    className="button-14"
                    role="button"
                  >
                    <i className="fa fa-trash" aria-hidden="true" style={{ color: "darkred" }}></i>
                  </button>
                  
                  </div>
                  </div>
                  <p style={{ fontWeight: "bold", fontFamily: "monospace"}}>
                    <i className="fa fa-tag" aria-hidden="true" style={{ padding: "3px", fontSize:"smaller" }}> </i>
                    {note.categories.map((cat) => cat.name).join(', ')}
                  </p>
                  
                </div>
                <p style={{ fontFamily: "monospace" }} >{note.content}</p>
              </div>
            ))
          ) : (
            archivedNotes.map((note) => (
              <div key={note._id} className="box">
                <div>
                  <div className='title-buttons-container'>
                  <div>
                  <h4 className="title-note">{note.title}</h4>
                  </div>
                  <div className='buttons-container'>
                  <button
                    onClick={() => navigate(`/${note._id}/edit`)}
                    className="button-14"
                    role="button"
                  >
                    <i className="fa fa-pencil" aria-hidden="true" style={{ color: "white" }}></i>
                  </button>
                  <button
                    onClick={() => unarchiveNote(note)}
                    className="button-14"
                    role="button"
                  >
                    <i className="fa fa-unlock-alt" aria-hidden="true" style={{ color: "white" }}></i>
                  </button>
                  <button
                    onClick={() => deleteNote(note._id)}
                    className="button-14"
                    role="button"
                  >
                    <i className="fa fa-trash" aria-hidden="true" style={{ color: "darkred" }}></i>
                  </button>
                  
                  </div>
                  </div>
                  <p style={{ fontWeight: "bold", fontFamily: "monospace" }}>
                    <i className="fa fa-tag" aria-hidden="true"> </i>
                    {note.categories.map((cat) => cat.name).join(', ')}
                  </p>
                  
                </div>
                <p style={{ fontFamily: "monospace" }}>{note.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <div>{error}</div>
    </div>
  );
};

export default NotesList;





