import React from 'react';
import '../styles/CommentBox.css';

const CommentBox = ({ comment }) => {
  return (
    <div className="comment-box">
      <h3 className="comment-title">{comment.username} commented</h3>
      <div className="comment-content">{comment.content}</div>
      <div className="comment-rating">Overall Rating: {comment.rating}</div>
    </div>
  );
};

export default CommentBox;