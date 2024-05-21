import React, { useState } from 'react';
import axios from 'axios';

const PasswordChange = ({ userId }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://libraryandarchive.somee.com/api/Users/changePassword', {
        userId,
        oldPassword,
        newPassword,
      });
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response.data.Message || 'Error changing password');
    }
  };

  return (
    <div className="password-change">
      <h3>Change your password</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Current Password:
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </label>
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordChange;