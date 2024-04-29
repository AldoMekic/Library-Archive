import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../context/my-context';
import axios from 'axios';
import SearchBar from './SearchBar';
import '../styles/NavBar.css';

const NavBar = ({toggleSidebar}) => {
  const { user, setUserFunction } = useContext(MyContext);
  const [searchType, setSearchType] = useState('name');
  const [showSidebar, setShowSidebar] = useState(false); 
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const logoutUserHandler = () => {
    setUserFunction(null);
    sessionStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/');
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSidebarButtonClick = () => {
    setShowSidebar((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setShowSidebar(false); 
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <ul>
        <li className='home-icon'>
            <Link to="/"><img src={require('../images/background/homeIcon.jpg')} alt="Home" className="nav-home-icon" /></Link>
          </li>
          {!user && (
            <>
              <li className="login-btn">
                <Link to="/login">Login</Link>
              </li>
              <li className="register-btn">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </>
          )}
          {user && <button onClick={logoutUserHandler}>Logout</button>}
        </ul>
      </div>
      <div className="nav-right">
        <div className="search-bar">
          <SearchBar searchType={searchType} handleSearchTypeChange={handleSearchTypeChange} />
        </div>
        <div className="sidebar-button">
          <button onClick={toggleSidebar}>
            <img src={require('../images/background/sidebarIcon.jpg')} alt="Sidebar" />
          </button>
        </div>
      </div>
      
    </nav>
  );
};

export default NavBar;
