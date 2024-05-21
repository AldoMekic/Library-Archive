import React from 'react';

const SearchResult = ({ searchResults, searchType, onSelect }) => {
  const handleResultClick = (item) => {
    onSelect(item);
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