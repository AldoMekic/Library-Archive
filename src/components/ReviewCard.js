import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ReviewCard.css';

const ReviewCard = ({ name, initialAmount, bookId }) => {
  const [amount, setAmount] = useState(initialAmount);
  const [clicked, setClicked] = useState(false);

  const handleIncrement = async () => {
    if (!clicked) {
      try {
        await axios.post(`https://localhost:7138/api/Books/bookAddReview/${bookId}/reviews`, {
          name: name,
          amount: 1,
        });
        setAmount(amount + 1);
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