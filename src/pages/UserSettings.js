import React from 'react';
import PasswordChange from '../components/PasswordChange';
import DeleteUser from '../components/DeleteUser';
import '../styles/UserSettings.css';

const UserSettings = ({ user }) => {
  return (
    <div className="user-settings">
      <h2>User Settings</h2>
      <PasswordChange userId={user.id} />
      <DeleteUser />
    </div>
  );
};

export default UserSettings;