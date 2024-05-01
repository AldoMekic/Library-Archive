import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResult = ({ searchResults, searchType, onSelect }) => {
  const navigate = useNavigate();

  const handleResultClick = (item) => {
    onSelect(item); // Pass item back to onSelect to determine navigation path
  };

  return (
    <div className="search-results">
      <ul>
        {searchResults.map((item) => (
          <li key={item.id} onClick={() => handleResultClick(item)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;