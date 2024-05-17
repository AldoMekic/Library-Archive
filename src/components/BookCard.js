import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BookCard.css';

const BookCard = ({ id, name, description, author, imageURL }) => {
  const imageSrc = imageURL ? require(`../images/covers/${imageURL}`) : null;

  return (
    <Link to={`/book/${id}`} className="book-card-link">
      <div className="book-card">
        <div className="left">
          {imageSrc && <img src={imageSrc} alt="Book Cover" className="book-cover" />}
        </div>
        <div className="right">
          <h2>{name}</h2>
          <p>{description}</p>
          <p><strong>Author:</strong> {author}</p>
          <div className="button-details">
            Details
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;