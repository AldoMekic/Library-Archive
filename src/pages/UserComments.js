import React, { useState, useEffect } from 'react';
import UserCommentList from '../components/UserCommentList';
import axios from 'axios';
import '../styles/UserComments.css';

const UserComments = ({ userComments }) => {

  

  return (
    <div className="user-comments">
      <h2>Your Comments</h2>
      <UserCommentList comments={userComments} />
    </div>
  );
};

export default UserComments;