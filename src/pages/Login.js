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
    window.onSignIn = (googleUser) => {
      const id_token = googleUser.getAuthResponse().id_token;
      axios.post('http://libraryandarchive.somee.com/api/Users/googleSignIn', { idToken: id_token })
        .then(response => {
          const { token } = response.data;
          localStorage.setItem('userToken', token);
          setUserFunction({ token });
          navigate('/profile');
        })
        .catch(error => {
          console.error('Error:', error);
          setErrorMessage('An error occurred with Google Sign In.');
        });
    };
  }, [navigate, setUserFunction]);

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
      console.log("Login token:", token);
      const userResponse = await axios.get(`http://libraryandarchive.somee.com/api/Users/get-user/${token}`);
      const userData = userResponse.data;
      console.log("Logged in user:" + userData);
      setUserFunction(userData);
      sessionStorage.setItem('user', JSON.stringify(userData)); // Save user data in sessionStorage
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
      <div className="g-signin2" data-onsuccess="window.onSignIn" data-theme="dark" data-longtitle="true" data-clientid="636906605322-ulliuqoenq2envbtglgo63us40afrbe0.apps.googleusercontent.com"></div>
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
    </div>
  );
};

export default Login;