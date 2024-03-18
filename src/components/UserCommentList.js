import React from 'react';
import UserCommentBox from './UserCommentBox';
import '../styles/UserCommentList.css';

const UserCommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <UserCommentBox key={index} comment={comment} />
      ))}
    </div>
  );
};

export default UserCommentList;