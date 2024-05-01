import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Ensure this is imported
import SearchResult from './SearchResult'; 
import '../styles/SearchBar.css';

const SearchBar = ({ searchType, handleSearchTypeChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searches, setSearches] = useState([]);
  const [categories, setCategories] = useState([]);
  const searchBarRef = useRef(null);
  const navigate = useNavigate(); // Define navigate using useNavigate hook

  const axiosInstance = axios.create({
    baseURL: 'http://libraryandarchive.somee.com/api/',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("Categories/getAllCategories");
        setCategories(response.data.map(category => ({ id: category.name, name: category.name }))); // Assuming the category object has a name
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSearches = async () => {
      try {
        const response = await axiosInstance.get("Books/searchAllBooks");
        setSearches(response.data); // No need to map here, already in desired structure
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
  
    fetchSearches();
  }, []);

  const searchItems = (term) => {
    if (searchType === 'genre') {
      return categories.filter(category => 
        category.name.toLowerCase().includes(term.toLowerCase())
      );
    } else {
      return searches.filter((book) =>
        book.name.toLowerCase().includes(term.toLowerCase())
      );
    }
  };

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm) {
      const results = searchItems(newSearchTerm);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultSelect = (item) => {
    setSearchTerm('');
    setSearchResults([]);
    if (searchType === 'genre') {
      console.log(item);
      navigate(`/category/${item.name}`);  // Use item.name for category navigation
    } else {
      console.log(item);
      navigate(`/book/${item.id}`);  // Use item.id for book details navigation
    }
  };

  return (
    <div className="search-bar" ref={searchBarRef}>
      <input
        type="text"
        placeholder={`Search for ${searchType === 'name' ? 'books by title' : 'categories by genre'}`}
        value={searchTerm}
        onChange={handleInputChange}
      />
      <select value={searchType} onChange={handleSearchTypeChange}>
        <option value="name">Name</option>
        <option value="genre">Genre</option>
      </select>
      {searchTerm && (
        <SearchResult 
          searchResults={searchResults} 
          searchType={searchType} 
          onSelect={handleSearchResultSelect} 
        />
      )}
    </div>
  );
};

export default SearchBar;