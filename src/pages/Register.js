import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/my-context'; 
import '../styles/Register.css'; 

const Register = () => {
  const { setUserFunction } = useContext(MyContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    isAdmin: false, // Add isAdmin to the state
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://apis.google.com/js/platform.js";
    script.onload = () => {
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
    document.body.appendChild(script);
  
    return () => {
      // Cleanup the script to avoid memory leaks
      document.body.removeChild(script);
    };
  }, [navigate, setUserFunction]);

  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    // Add your code here to handle the Google sign-in response
  };

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
      sessionStorage.setItem('user', JSON.stringify(userData)); // Save user data in sessionStorage
      navigate('/profile');
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  
  return (
    <div className='register-page'>
    <div className="register-container">
      <h1>Register</h1>
      <div id="my-signin2" className="g-signin2" data-onsuccess="window.onSignIn" data-theme="dark" data-longtitle="true" data-clientid="636906605322-ulliuqoenq2envbtglgo63us40afrbe0.apps.googleusercontent.com"></div>
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

        {/* Radio buttons for role selection */}
        <div className="radio-group">
          <input
           type="radio"
           id="user"
           name="role"
           value="user"
           checked={!formData.isAdmin}
           onChange={handleRoleChange}
          />
         <label htmlFor="user">User</label>

  <input
    type="radio"
    id="admin"
    name="role"
    value="admin"
    checked={formData.isAdmin}
    onChange={handleRoleChange}
  />
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