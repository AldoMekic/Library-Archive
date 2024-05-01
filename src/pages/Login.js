import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/my-context';
import '../styles/Login.css';
import { GoogleLogin } from '@react-oauth/google';

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
    if (formData.username.trim().length === 0 || formData.email.trim().length === 0 || formData.password.trim().length === 0) {
      setErrorMessage('Please enter a valid username, email, and password!');
      return;
    }

    try {
      const loginResponse = await axios.post('http://libraryandarchive.somee.com/api/Users/loginUser', formData);
      const token = loginResponse.data;
      const userResponse = await axios.get(`http://libraryandarchive.somee.com/api/Users/get-user/${token}`);
      const userData = userResponse.data;
      setUserFunction(userData);
      sessionStorage.setItem('user', JSON.stringify(userData));
      navigate('/profile');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Invalid username, email, or password');
    }
  };

  const handleCredentialResponse = async (response) => {
    try {
      // Extract the ID token from the Google credential response
      const { credential } = response;
  
      // Post the ID token to your backend for verification and user handling
      const serverResponse = await axios.post('http://libraryandarchive.somee.com/api/Users/googleSignIn', {
        IdToken: credential  // Make sure the property name matches the expected DTO field
      });
  
      if (serverResponse.status === 200) {
        const { user, token } = serverResponse.data;
        setUserFunction(user);  // Set the user in your context/state
        sessionStorage.setItem('user', JSON.stringify(user));  // Save user data in sessionStorage
        navigate('/profile');  // Navigate to the profile page
      } else {
        throw new Error('Failed to authenticate with Google.');
      }
    } catch (error) {
      console.error('Error processing Google sign-in:', error);
      setErrorMessage(error.response?.data?.Message || 'Failed to login with Google');
    }
  };

  return (
    <div className='login-page'>
      <div className="login-container">
        <h1>Login</h1>
        <GoogleLogin
          onSuccess={handleCredentialResponse}
          onError={() => setErrorMessage('Google Sign In was unsuccessful.')}
        />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;