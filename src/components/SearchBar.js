import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SearchResult from './SearchResult'; 
import '../styles/SearchBar.css';

const SearchBar = ({ searchType, handleSearchTypeChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searches, setSearches] = useState([]);
  const searchBarRef = useRef(null);

  const axiosInstance = axios.create({
    baseURL: 'http://libraryandarchive.somee.com/api/',
  });

  useEffect(() => {
    const fetchSearches = async () => {
      try {
        const response = await axiosInstance.get("Books/searchAllBooks");
        const responseData = response.data;
        const booksData = responseData.map(book => ({
          id: book.id,
          name: book.name,
          genre: book.genre
        }));
        setSearches(booksData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
  
    fetchSearches();
  
    const handleOutsideClick = (e) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
        setSearchResults([]);
      }
    };
  
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const searchBooks = (searchTerm) => {
    return searches.filter((book) =>
      searchType === 'name'
        ? book.name.toLowerCase().includes(searchTerm.toLowerCase())
        : book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm) {
      const results = searchBooks(newSearchTerm);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultSelect = () => {
    setSearchResults([]);
  };

  return (
    <div className="search-bar" ref={searchBarRef}>
      <input
        type="text"
        placeholder="Search for a book title..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <select value={searchType} onChange={handleSearchTypeChange}>
        <option value="name">Name</option>
        <option value="genre">Genre</option>
      </select>
      {searchTerm && (
        <SearchResult searchResults={searchResults} searchType={searchType} onSelect={handleSearchResultSelect} />
      )}
    </div>
  );
};

export default SearchBar;