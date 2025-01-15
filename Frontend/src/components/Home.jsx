import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NotesList from "./NotesList";
import "../Styles-CSS/Home.css";
import Axios from 'axios';
import pacmanGif from "../assets/pacman.gif";

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const isConfirmed = window.confirm("Are you sure you want to logout?");
        if (isConfirmed) {
        // Eliminar los tokens del localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    
        // Limpiar los encabezados de Axios
        delete Axios.defaults.headers['Authorization'];
    
        // Redirigir al usuario a la página de login
        navigate('/login');}
      };

    return (
        <div>
            <div className="desktop-display">
                <NotesList></NotesList>
                    <div className="welcome-banner">
                       
                            <h1>Welcome to </h1>
                            <h1 style={{color: "#ff75ed"}}>My Notes App</h1>
                        
                        <div>
                            <button className="add-note-button"><Link to="/new-note"> + Add Note </Link> </button>
                        </div>
                        <div>
                            <button className="button-logout"onClick={handleLogout}>Logout</button>
                        </div>
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
        </div>
    )
};

export default Home;