// Search input for filtering contacts
import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;