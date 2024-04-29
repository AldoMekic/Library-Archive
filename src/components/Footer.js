import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../context/my-context';  // Ensure this path is correct
import '../styles/Footer.css';

const Footer = () => {
  const { user } = useContext(MyContext);

  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/">Home</Link>
        {user ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
      <div className="footer-text-container">
        <p className="footer-text">Library&amp;Archive</p>
      </div>
    </footer>
  );
};

export default Footer;