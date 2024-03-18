import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookWishList from '../components/BookWishList';
import '../styles/My_Books.css';

const My_Books = ({ user }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        if (user) {
          const response = await axios.get(`https://localhost:7138/api/Users/userGetBooks/${user.id}/user-books`);
          setBooks(response.data);
        }
      } catch (error) {
        console.error("Error fetching user books:", error);
      }
    };

    fetchUserBooks();
  }, [user]); 

  const handleRemoveBook = (bookId) => {
    const updatedBooks = books.filter(book => book.id !== bookId);
    setBooks(updatedBooks);
  };

  return (
    <div className="my-books-container">
      <div className="book-wish-list-container">
        <BookWishList wishedBooks={books} userId={user?.id} onRemove={handleRemoveBook} />
      </div>
    </div>
  );
};

export default My_Books;