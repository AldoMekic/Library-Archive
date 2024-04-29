import React from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import '../styles/BookWish.css';

const BookWish = ({ book, userId, onRemove }) => { 
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: 'http://libraryandarchive.somee.com/api/',
  });

  const handleRemoveClick = async () => {
    if (!userId || !book || !book.id) {
      console.error("Invalid userId or book details");
      return;
    }
    
    try {
      await axiosInstance.delete(`Users/userRemoveBook/${userId}/remove-book/${book.id}`);
      onRemove(book.id); 
    } catch (error) {
      console.error("Error removing book:", error);
    }
  };

  const handleGoToClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <div className="book-wish">
      <div className="book-info">
        <h3 className="book-name">{book.name}</h3>
        <p className="author">Author: {book.author}</p>
      </div>
      <div className="buttons">
        <button className="remove-button" onClick={handleRemoveClick}>Remove</button>
        <button className="go-to-button" onClick={handleGoToClick}>Go to</button>
      </div>
    </div>
  );
};

export default BookWish;