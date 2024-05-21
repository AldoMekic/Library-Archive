import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/DeleteUserConfirm.css';

const DeleteUserConfirm = ({ onCancel }) => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user")); // Assuming the user object is stored in sessionStorage

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://libraryandarchive.somee.com/api/Users/deleteUser/${user.id}`);
      sessionStorage.removeItem("user"); // Remove user from sessionStorage
      delete axios.defaults.headers.common['Authorization']; // Clear authorization header
      navigate('/'); // Redirect to Home page
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="delete-user-confirm">
      <h2>Are you sure?</h2>
      <p>If you delete your account, all related data will be lost.</p>
      <button className="cancel-button" onClick={onCancel}>Cancel</button>
      <button onClick={handleConfirmDelete}>Confirm</button>
    </div>
  );
};

export default DeleteUserConfirm;