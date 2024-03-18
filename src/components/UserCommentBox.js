import React from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import '../styles/UserCommentBox.css';

const UserCommentBox = ({ comment }) => {
  const navigate = useNavigate(); 

  const handleBookButtonClick = async () => {
    try {
      const response = await axios.get(`https://localhost:7138/api/Books/getBookByName/${comment.bookName}`);
      const book = response.data;
      
      navigate(`/book/${book.id}`);
    } catch (error) {
      console.error('Error fetching book by name:', error);
    }
  };

  return (
    <div className="user-comment-box">
      <h3 className="comment-title">{comment.username} commented on <button onClick={handleBookButtonClick} className="book-name-button">{comment.bookName}</button></h3>
      <div className="comment-content">{comment.content}</div>
      <div className="comment-rating">Overall Rating: {comment.rating}</div>
    </div>
  );
};

export default UserCommentBox;