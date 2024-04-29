import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookWishList from '../components/BookWishList';
import '../styles/My_Books.css';

const MyBooks = ({ user }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // This function is declared inside useEffect to avoid dependency on axiosInstance
    const fetchUserBooks = async () => {
      if (!user) return;

      try {
        const response = await axios.get(`http://libraryandarchive.somee.com/api/Users/userGetBooks/${user.id}/user-books`);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching user books:", error);
      }
    };

    fetchUserBooks();
  }, [user?.id]); // Depend only on user.id to avoid unnecessary re-fetches

  const handleRemoveBook = async (bookId) => {
    try {
      const response = await axios.delete(`http://libraryandarchive.somee.com/api/Users/userRemoveBook/${user.id}/remove-book/${bookId}`);
      if (response.status === 200) {
        setBooks(books.filter(book => book.id !== bookId));
      }
    } catch (error) {
      console.error("Error removing book:", error);
    }
  };

  return (
    <div className="my-books-container">
      <div className="book-wish-list-container">
        <BookWishList wishedBooks={books} userId={user?.id} onRemove={handleRemoveBook} />
      </div>
    </div>
  );
};

export default MyBooks;