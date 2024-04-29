import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from '../context/my-context';
import '../styles/Profile.css';
import MyBooks from './MyBooks';
import UserComments from '../pages/UserComments';
import axios from 'axios';

const Profile = () => {
  const { user } = useContext(MyContext);
  const [activeButton, setActiveButton] = useState('My Books');
  const [userComments, setUserComments] = useState([]); 

  const axiosInstance = axios.create({
    baseURL: 'http://libraryandarchive.somee.com/api/',
  });

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  useEffect(() => {
    // Define fetchUserComments inside useEffect to use the latest state and avoid extra dependencies
    const fetchUserComments = async () => {
      if (!user || activeButton !== 'Comments') return;
  
      try {
        const response = await axios.get(`http://libraryandarchive.somee.com/api/Users/userGetComments/${user.id}/user-comments`);
        setUserComments(response.data);
      } catch (error) {
        console.error('Error fetching user comments:', error);
      }
    };
  
    // Call the fetch function
    fetchUserComments();
  }, [user?.id, activeButton]);

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
        {activeButton === 'My Books' && <MyBooks user={user} />}
        {activeButton === 'Comments' && <UserComments userComments={userComments} />}
      </div>
    </div>
  );
};

export default Profile;