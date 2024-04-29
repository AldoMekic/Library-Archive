import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BookCard.css';

const BookCard = ({ id, name, description, author, imageURL }) => {
  const imageSrc = imageURL ? require(`../images/covers/${imageURL}`) : null;

  return (
    <div className="book-card">
      <div className="right">
        <h2>{name}</h2>
        <p>{description}</p>
        <p><strong>Author:</strong> {author}</p>
        
        <Link to={`/book/${id}`} className="button-details">
          Details
        </Link>
      </div>

      <div className="left">
        {imageSrc && <img src={imageSrc} alt="Book Cover" className="book-cover" />}
      </div>
    </div>
  );
};

export default BookCard;