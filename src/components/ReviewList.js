import React, { useState } from 'react';
import axios from 'axios';
import ReviewCard from './ReviewCard';
import '../styles/ReviewList.css';

const ReviewList = ({ initialReviews, id }) => {
  const [reviews, setReviews] = useState(initialReviews || []);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');

  const axiosInstance = axios.create({
    baseURL: 'http://libraryandarchive.somee.com/api/',
  });

  const newReview = async (name) => {
    if (!id || typeof id !== 'string' || !name.trim()) {
      console.error("Invalid book ID or review name");
      return;
    }
  
    try {
      const postResponse = await axiosInstance.post(`Books/bookAddReview/${id}/reviews`, {
        name: name,
        amount: 1,
      });
  
      const response = await axiosInstance.get(`Books/getBookById/${id}`);
      if (response.data && response.data.reviews) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleAddReviewClick = () => {
    setShowAddReview(true);
  };

  const handleNameChange = (event) => {
    setNewReviewName(event.target.value);
  };

  const handleAddReviewSubmit = async () => {
    if (newReviewName.trim() !== '') {
      await newReview(newReviewName.trim());
      setNewReviewName('');
      setShowAddReview(false);
    } else {
      alert('Please enter a name for the review.');
    }
  };

  return (
    <div className="review-list">
      <div className="header">
        <h2>Reviews</h2>
      </div>
      {reviews.length > 0 ? (
        <div className="reviews">
          {reviews.map((review, index) => (
            <ReviewCard key={index} name={review.name} initialAmount={review.amount} bookId={id}/>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>No reviews yet. Do you want to add your own?</p>
      )}
      {showAddReview && (
        <div className="add-review">
          <input
            type="text"
            placeholder="Enter name"
            value={newReviewName}
            onChange={handleNameChange}
          />
          <button onClick={handleAddReviewSubmit}>Submit</button>
        </div>
      )}
      
      <div className="add-review">
        <button onClick={handleAddReviewClick}>Add Review</button>
      </div>
    </div>
  );
};

export default ReviewList;