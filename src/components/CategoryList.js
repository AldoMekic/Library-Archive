import React, { useState } from 'react';
import BookCard from './BookCard';
import "../styles/CategoryList.css";

const CategoryList = ({ category, books }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next');

  const handleNextClick = () => {
    if (currentIndex + 3 < books.length) {
      setCurrentIndex((prevIndex) => prevIndex + 3);
      setDirection('next');
    }
  };

  const handlePrevClick = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex((prevIndex) => prevIndex - 3);
      setDirection('prev');
    }
  };

  return (
    <div className="category-list">
      <div className="category-header">
        <h2 className="category-title">{category}</h2>
      </div>
      <div className="category-content">
        <div className="navigation-buttons">
          <button className='category-button' onClick={handlePrevClick} disabled={currentIndex === 0}>Previous</button>
        </div>
        <div className={`book-cards-container ${direction}`}>
          {books.slice(currentIndex, currentIndex + 3).map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </div>
        <div className="navigation-buttons">
          <button className='category-button' onClick={handleNextClick} disabled={currentIndex + 3 >= books.length}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;