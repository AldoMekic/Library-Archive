import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/my-context';
import '../styles/Login.css';

const Login = () => {
  const { setUserFunction } = useContext(MyContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setErrorMessage('');
  
    if (formData.username.trim().length === 0 || formData.email.trim().length === 0 || formData.password.trim().length === 0) {
      setErrorMessage('Please enter a valid username, email, and password!');
      return;
    }
  
    try {
      const response = await axios.post(
        'https://localhost:7138/api/Users/loginUser',
        formData
      );

      const responseData = response.data;

  
      const userResponse = await axios.get(`https://localhost:7138/api/Users/get-user/${responseData}`);
      const userData = userResponse.data;
  
      setUserFunction(userData);
  
      localStorage.setItem('user', JSON.stringify(userData));
  
      setFormData({ username: '', email: '', password: '' });
  
      navigate('/profile');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Invalid username, email, or password');
    }
  };
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Login;