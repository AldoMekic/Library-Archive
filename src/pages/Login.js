import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/my-context';
import '../styles/Login.css';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const { setUserFunction } = useContext(MyContext);
  const [formData, setFormData] = useState({
    identifier: '', // This will be used for both username and email
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
    if (formData.identifier.trim().length === 0 || formData.password.trim().length === 0) {
      setErrorMessage('Please enter a valid identifier (username or email) and password!');
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
      setErrorMessage('Invalid identifier (username or email) or password');
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
    <div className='login-page'>
      <div className="login-container">
        <h1>Login</h1>
        <GoogleLogin
          onSuccess={handleCredentialResponse}
          onError={() => setErrorMessage('Google Sign In was unsuccessful.')}
        />
        <form onSubmit={handleSubmit}>
          <label htmlFor="identifier">Username or Email:</label>
          <input type="text" id="identifier" name="identifier" value={formData.identifier} onChange={handleChange} required />
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