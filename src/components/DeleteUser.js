import React, { useState } from 'react';
import DeleteUserConfirm from './DeleteUserConfirm';
import '../styles/DeleteUser.css';

const DeleteUser = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  return (
    <div className="delete-user">
      <h2>Delete Your User Account</h2>
      <button onClick={handleDeleteClick}>Delete</button>
      {showConfirm && <DeleteUserConfirm onCancel={() => setShowConfirm(false)} />}
    </div>
  );
};

export default DeleteUser;