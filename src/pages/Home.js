import React, { useContext } from 'react';
import CategoryList from '../components/CategoryList'; 
import { MyContext } from '../context/my-context';
import '../styles/Home.css'; 

const Home = ({ books }) => {
  const { user } = useContext(MyContext);


  return (
    <div className="home-container">
      <div className="info-container">
        <h1 className="title">What is Library&amp;Archive?</h1>
        <p className="description">
          This is a web application meant for finding various electronic books at one place,
          as well as sharing your opinions and keeping track of the books you are interested in.
        </p>
      </div>

      <div className='category-list-container'>
        <CategoryList category="Mystery" books={books} />
        <CategoryList category="Thriller" books={books} />
        <CategoryList category="Horror" books={books} />
      </div>

      {!user && (<div className='info-container'>
        <h1 className="title">Not Signed In?</h1>
        <p className="description">
          The features of the website cannot be fully accessed unless you are signed in. Either <a href="/login">log in</a> to an existing account or 
          <a href='/register'> register</a> as a new user of the application.
        </p>
      </div>)}

      {user && (<div className='info-container'>
        <h1 className="title">Want to add a new book to your list?</h1>
        <p className='description'>
          Check out the book you want and add it to your own <a href='/my_books'>list</a>, or simply add a comment or a review if it seems interesting.
        </p>
      </div>)}

      <div className='category-list-container'>
        <CategoryList category="Trending" books={books} />
        <CategoryList category="Romance" books={books} />
        <CategoryList category="Philosophy" books={books} />
      </div>

      <div className='info-container'>
        <h1 className="title">Want to discover more?</h1>
        <p className='description'>
          For finding more Categories or possibly even the many lists of books various users have created, feel free to use the search bar or 
          the browsing tab. As well, you can specify what you are looking for in the search bar to allow for more specific results. Hope you enjoy your stay!
        </p>
      </div>
    </div>
  );
};

export default Home;