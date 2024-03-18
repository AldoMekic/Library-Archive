import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MyContext } from '../context/my-context'; 
import '../styles/Register.css'; 

const Register = () => {
  const { setUserFunction } = useContext(MyContext); 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');

    if (formData.username.trim().length === 0) {
      setErrorMessage("Please enter a valid username!");
      return;
    }

    if (formData.password.trim().length === 0) {
      setErrorMessage("Please enter a valid password!");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7138/api/Users/registerUser",
        formData
      );

      const responseData = response.data;

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${responseData.token}`;

      setUserFunction(responseData);
      localStorage.setItem('user', JSON.stringify(responseData));

      setFormData({ username: '', password: '', confirmPassword: '' , email: ''});

      navigate('/profile');

    } catch (error) {
      console.error("Error:", error);
    }
  };

 

  return (
    <div className="register-container">
      <h1>Register</h1>
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

        <label htmlFor="confirmPassword">Confirm Password:</label> 
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      
        <button type="submit">Register</button>
      </form>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Register;