import React from 'react';
import BookWish from './BookWish';
import "../styles/BookWishList.css";

const BookWishList = ({ wishedBooks, userId, onRemove }) => { 
  return (
    <div className="book-wish-list">
      <div className="wishlist-header">
        <h2>Wishlist of the User</h2>
        <p>Total number of wished books: {wishedBooks.length}</p>
      </div>
      <div className="book-wishes">
        {wishedBooks.map((book, index) => (
          <BookWish key={index} book={book} userId={userId} onRemove={onRemove} />
        ))}
      </div>
      <div className="back-to-profile">
        <button>Back to Profile</button>
      </div>
    </div>
  );
};

export default BookWishList;