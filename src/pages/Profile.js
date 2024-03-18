import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from '../context/my-context';
import '../styles/Profile.css';
import My_Books from '../pages/My_Books';
import UserComments from '../pages/UserComments';
import axios from 'axios';

const Profile = () => {
  const { user } = useContext(MyContext);
  const [activeButton, setActiveButton] = useState('My Books');
  const [userComments, setUserComments] = useState([]); 

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        const response = await axios.get(`https://localhost:7138/api/Users/userGetComments/${user.id}/user-comments`);
        setUserComments(response.data);
      } catch (error) {
        console.error('Error fetching user comments:', error);
      }
    };

    if (user && user.id && activeButton === 'Comments') {
      fetchUserComments();
    }
  }, [user, activeButton]);

  return (
    <div className="profile-container">
      <div className="upper-div">
        <h1>Welcome to your profile page</h1>
        <p>Name: {user ? user.username : 'John Doe'}</p>
      </div>

      <div className="nav-bar">
        <button
          className={activeButton === 'My Books' ? 'active' : ''}
          onClick={() => handleButtonClick('My Books')}
        >
          My Books
        </button>
        <button
          className={activeButton === 'Comments' ? 'active' : ''}
          onClick={() => handleButtonClick('Comments')}
        >
          Comments
        </button>
        
      </div>

      <div className="lower-div">
        {activeButton === 'My Books' && <My_Books user={user} />}
        {activeButton === 'Comments' && <UserComments userComments={userComments} />}
      </div>
    </div>
  );
};

export default Profile;