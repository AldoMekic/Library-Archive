import React from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import '../styles/UserCommentBox.css';

const UserCommentBox = ({ comment }) => {
  const navigate = useNavigate(); 

  const axiosInstance = axios.create({
    baseURL: 'http://libraryandarchive.somee.com/api/',
  });

  const handleBookButtonClick = async () => {
    try {
      const encodedBookName = encodeURIComponent(comment.bookName);
      const response = await axiosInstance.get(`Books/getBookByName/${encodedBookName}`);
      const book = response.data;
  
      if (book && book.id) {
        navigate(`/book/${book.id}`);
      } else {
        console.error('Book data is missing or incomplete');
      }
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