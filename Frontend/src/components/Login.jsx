import { useState } from "react"; 
import { useNavigate, Link } from 'react-router-dom';
import Axios from "axios";
import "../Styles-CSS/Login.css";
import pacmanGif from "../assets/pacman.gif";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userName") {
      setUserName(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = 'http://localhost:8080/api/auth/login'; 
    const config = {
      userName,
      password,
    };
  
    try {
      const response = await Axios.post(URL, config);
  
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data.message) {
          setError(error.response.data.message);
      } else {
          setError('Unexpected error ocurred.');
      }
  }
  };

  return (
    <div  className="form-container-login">
      <div>
          <img src={ pacmanGif } alt="pacman" 
              style={{ 
              transform: 'rotate(270deg)',
              width: '500px', 
              height: 'auto', 
              marginTop:"10px"}}/>
      </div>
      <form onSubmit={handleSubmit}>
        <h2 className="titulo">My Notes App</h2>
        <div className='input-container'>
        <div className="input-box">
          <label htmlFor="userName">Username </label>
          <input
            value={userName}
            type="text"
            name="userName"
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <label htmlFor="password">Password </label>
          <input
            value={password}
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        </div>

        {/* Mostrar error si existe */}
        {error && <div className="mensaje-error" style={{ color: "red" }}>{error}</div>}
        <p className="create-account-link"><Link to="/register">Don't have an account yet? Register here.</Link></p>
        <div className="button-container">
          <button className="button-1" type="submit">Login</button>
        </div>
      </form>
      <div>
          <img src={ pacmanGif } alt="pacman" 
              style={{ 
              transform: 'rotate(90deg)',
              width: '500px', 
              height: 'auto', 
              marginTop:"10px"}}/>
      </div>
    </div>
  );
};

export default Login;