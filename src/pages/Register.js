import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/my-context';
import '../styles/Register.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Register = () => {
  const { setUserFunction } = useContext(MyContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    isAdmin: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setFormData(prevState => ({ ...prevState, isAdmin: e.target.value === 'admin' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim() || formData.password !== formData.confirmPassword) {
      setErrorMessage("Please check your inputs.");
      return;
    }

    try {
      const response = await axios.post("http://libraryandarchive.somee.com/api/Users/registerUser", { ...formData, isAdmin: formData.isAdmin });
      const userData = response.data;
      setUserFunction(userData);
      sessionStorage.setItem('user', JSON.stringify(userData));
      navigate('/profile');
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleCredentialResponse = async (response) => {
    try {
      const { credential } = response;
      const serverResponse = await axios.post('http://libraryandarchive.somee.com/api/Users/googleSignIn', {
        IdToken: credential
      });

      if (serverResponse.status === 200) {
        const { user, token } = serverResponse.data;
        setUserFunction(user);
        sessionStorage.setItem('user', JSON.stringify(user));
        navigate('/profile');
      } else {
        throw new Error('Failed to authenticate with Google.');
      }
    } catch (error) {
      console.error('Error processing Google sign-in:', error);
      setErrorMessage(error.response?.data?.Message || 'Failed to login with Google');
    }
  };

  return (
    <div className='register-page'>
      <div className="register-container">
        <h1>Register</h1>
        <GoogleLogin
          onSuccess={handleCredentialResponse}
          onError={() => setErrorMessage("Google sign-in failed. Please try again.")}
        />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          <div className="radio-group">
            <input type="radio" id="user" name="role" value="user" checked={!formData.isAdmin} onChange={handleRoleChange} />
            <label htmlFor="user">User</label>
            <input type="radio" id="admin" name="role" value="admin" checked={formData.isAdmin} onChange={handleRoleChange} />
            <label htmlFor="admin">Admin</label>
          </div>
          <button type="submit">Register</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Register;