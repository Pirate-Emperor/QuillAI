import React from 'react';

// TODO: rewrite wrapper as widget
const SearchInput = ({ query, setQuery, onSearch }) => {
    return (
        <div className="search-container"> 
            <input
                className="search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter search query"
            />
            <button className='search-button' onClick={onSearch}>Search</button>
        </div>
    );
};

export default SearchInput;
