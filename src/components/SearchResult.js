import React from 'react';
import { Link } from 'react-router-dom'; 

const SearchResult = ({ searchResults, searchType, onSelect }) => {
  if (searchResults.length === 0) {
    return null; 
  }

  return (
    <div className="search-results">
      <ul>
        {searchResults.map((book) => (
          <li key={book.id} onClick={onSelect}>
            <Link to={`/book/${book.id}`}> 
              {searchType === 'name' ? book.name : book.genre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;