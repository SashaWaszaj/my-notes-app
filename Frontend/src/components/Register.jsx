import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import pacmanGif from "../assets/pacman.gif";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', formData);
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.response.data.mensaje);
    };
}
  const handleCancel = () => {
    navigate("/login");
};
  
  return (
    <div className="form-container-login">
      <div>
        <img src={ pacmanGif } alt="pacman" 
            style={{ 
            transform: 'rotate(270deg)',
            width: '500px', 
            height: 'auto', 
            marginTop:"10px"}}/>
      </div>
      <form onSubmit={handleSubmit}>
        <h2 className="titulo">Create User</h2>
        <div className='input-container'>
        <div className='input-box'>
          <label htmlFor="userName">Username </label>
          <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          />
        </div>
        <div className='input-box'>
        <label htmlFor="email">Email </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
         />
        </div>

        <div className='input-box'>
        <label htmlFor="password">Password </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
         />
        </div>

        <div className='input-box'>
        <label htmlFor="confirmPassword">Confirm Password </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
         />
        </div>
        </div>
        
        <div className="mensaje-error">{error}</div>
        <div className='button-container'>
        <button className="button-1" role="button" type="submit">Register</button>
        <button className="button-2" role="button" type="button" onClick={handleCancel}>Cancel</button>
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

export default Register;