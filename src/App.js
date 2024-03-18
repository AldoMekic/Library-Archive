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
  const { setUserFunction } = useContext(MyContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const [books, setBooks] = useState([]);
  const { user } = useContext(MyContext);

  useEffect(() => {
    const fetchUser = async () => {
      const data = localStorage.getItem("user");
      const currentUser = JSON.parse(data);
      if (currentUser) {
        setUserFunction(currentUser);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${currentUser.token}`;
      }
    };
  
    fetchUser();
  }, []);

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const response = await axios.get("https://localhost:7138/api/Books/searchAllBooks");
        const responseData =  response.data;
        setBooks(responseData);
      } catch(error) {
        console.log("Error", error);
      }
    };
    getAllBooks();
  }, []);

  

  const handleBeforeUnload = () => {
    if (!user) {
      localStorage.removeItem("user");
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className='app-container'>
        <NavBar toggleSidebar={toggleSidebar}/>
        <Routes>
          <Route path="/" element={<Home books={books} />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register/>}/> 
          <Route path='/profile' element={<Profile/>} /> 
          <Route path="/book/:id" element={<Book />} /> 
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer/>
        <Sidebar toggle={showSidebar}/>
      </div>
    </>
  );
};

export default App;