import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchResult from './SearchResult';
import '../styles/SearchBar.css';

const SearchBar = ({ searchType, handleSearchTypeChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searches, setSearches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const searchBarRef = useRef(null);
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: 'http://libraryandarchive.somee.com/api/',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("Categories/getAllCategories");
        setCategories(response.data.map(category => ({ id: category.name, name: category.name })));
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
        setSearches(response.data);
      } catch (error) {
        console.error("Error fetching books", error);
      }
    };

    fetchSearches();
  }, []);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axiosInstance.get("Authors/getAllAuthors");
        setAuthors(response.data.map(author => ({ id: author.id, name: author.fullName })));
      } catch (error) {
        console.error("Error fetching authors", error);
      }
    };

    fetchAuthors();
  }, []);

  const searchItems = (term) => {
    if (searchType === 'genre') {
      return categories.filter(category => 
        category.name.toLowerCase().includes(term.toLowerCase())
      );
    } else if (searchType === 'author') {
      return authors.filter((author) =>
        author.name.toLowerCase().includes(term.toLowerCase())
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
      navigate(`/category/${item.name}`);
    } else if (searchType === 'author') {
      navigate(`/author/${item.id}`);
    } else {
      navigate(`/book/${item.id}`);
    }
  };

  return (
    <div className="search-bar" ref={searchBarRef}>
      <input
        type="text"
        placeholder={`Search for ${searchType === 'name' ? 'books by title' : searchType === 'genre' ? 'categories by genre' : 'authors'}`}
        value={searchTerm}
        onChange={handleInputChange}
      />
      <select value={searchType} onChange={handleSearchTypeChange}>
        <option value="name">Title</option>
        <option value="genre">Genre</option>
        <option value="author">Author</option>
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