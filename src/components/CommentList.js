import React from 'react';
import CommentBox from './CommentBox';
import "../styles/CommentList.css"

const CommentList = ({ comments }) => {
  const calculateUserScore = () => {
    if (comments.length === 0) return 0;
    const totalScore = comments.reduce((acc, comment) => acc + comment.rating, 0);
    const averageScore = totalScore / comments.length;
    return Math.round(averageScore * 100) / 100;
  };

  return (
    <div className="comment-list">
      <h2 className="comment-section-title">Comment Section</h2>
      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        <div className="comment-container">
          {comments.map((comment, index) => (
            <CommentBox key={index} comment={comment} />
          ))}
        </div>
      )}
      <p>User Score: {calculateUserScore()}</p>
    </div>
  );
};

export default CommentList;