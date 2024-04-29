import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ReviewCard.css';

const ReviewCard = ({ name, initialAmount, bookId }) => {
  const [amount, setAmount] = useState(initialAmount);
  const [clicked, setClicked] = useState(false);

  const axiosInstance = axios.create({
    baseURL: 'http://libraryandarchive.somee.com/api/',
  });

  const handleIncrement = async () => {
    if (!bookId || !name) {
      console.error("Book ID or name is missing");
      return;
    }
  
    if (!clicked) {
      try {
        await axiosInstance.post(`Books/bookAddReview/${bookId}/reviews`, {
          name: name,
          amount: 1,
        });
        setAmount(prevAmount => prevAmount + 1);
        setClicked(true);
      } catch (error) {
        console.error("Error incrementing review count:", error);
      }
    }
  };

  const cardStyle = {
    border: clicked ? '5px solid firebrick' : '2px solid black',
  };

  return (
    <div className="review-card" style={cardStyle} onClick={handleIncrement}>
      <span className="name">{name}</span>
      <span className="amount">{amount}</span>
    </div>
  );
};

export default ReviewCard;