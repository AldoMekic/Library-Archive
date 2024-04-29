import React, { useState, useContext, useEffect } from 'react';
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

  useEffect(() => {
    // Function to load the Google API script
    const loadGoogleApi = () => {
      const script = document.createElement('script');
      script.src = "https://apis.google.com/js/platform.js";
      script.onload = () => initGoogleSignIn(); // Initialize Google Sign-In after the script loads
      document.body.appendChild(script);
    };

    const initGoogleSignIn = () => {
      window.gapi.load('auth2', () => {
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init({
            client_id: '636906605322-ulliuqoenq2envbtglgo63us40afrbe0.apps.googleusercontent.com'
          });
        }
        window.gapi.signin2.render('my-signin2', {
          'scope': 'profile email',
          'width': 240,
          'height': 50,
          'longtitle': true,
          'theme': 'dark',
          'onsuccess': handleCredentialResponse
        });
      });
    };

    // Check if gapi is already loaded
    if (!window.gapi) {
      loadGoogleApi();
    } else {
      initGoogleSignIn();
    }
  }, [navigate, setUserFunction]);

  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    // Add your code here to handle the Google sign-in response
  };

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

  return (
    <div className='login-page'>
      <div className="login-container">
        <h1>Login</h1>
        <div id="my-signin2"></div>
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