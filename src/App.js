import React, { useState, useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router-dom'; 
import axios from 'axios';
import { MyContext } from './context/my-context';
import "./styles/App.css"
import Home from './pages/Home';
import Login from './pages/Login';
import Book from './pages/Book';
import NavBar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import Footer from './components/Footer';
import AdminPage from './pages/AdminPage';

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [books, setBooks] = useState([]);
  const { user, setUserFunction } = useContext(MyContext);


  useEffect(() => {
    const fetchUser = async () => {
      const data = sessionStorage.getItem("user"); // Use sessionStorage
      const currentUser = JSON.parse(data);
      if (currentUser) {
        setUserFunction(currentUser);
        axios.defaults.headers.common["Authorization"] = `Bearer ${currentUser.token}`;
      }
    };
  
    fetchUser();
  }, [setUserFunction]);

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const response = await axios.get("http://libraryandarchive.somee.com/api/Books/searchAllBooks");
        setBooks(response.data);
      } catch (error) {
        console.log("Error fetching books:", error);
      }
    };
    getAllBooks();
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  return (
    <div className='app-container'>
      <div style={{ display: 'flex' }}>
      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} user={user} />
        <div style={{ flex: 1 }}>
          <NavBar toggleSidebar={toggleSidebar} /> {/* Pass toggleSidebar to NavBar */}
          <Routes>
            <Route path="/" element={<Home books={books} />} />
            <Route path="/login" element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path="/book/:id" element={<Book />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/administrator" element={<AdminPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;