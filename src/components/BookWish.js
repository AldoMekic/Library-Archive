import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BookWish.css';

const BookWish = ({ book, userId, onRemove }) => {
  const navigate = useNavigate();

  const handleRemoveClick = () => {
    if (!userId || !book || !book.id) {
      console.error("Invalid userId or book details");
      return;
    }

    onRemove(book.id); // Trigger the remove action passed down from the parent
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