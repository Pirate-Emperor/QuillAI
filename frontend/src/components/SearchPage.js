import React, { useState } from 'react';
import config from '../config';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';


const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await config.axios_b.get(`/search?query=${query}`);
      setPosts(response.data);
    } catch (error) {
      alert("Posts not found, try another query");
      console.error('Error fetching search results:', error);  // dev
    }
  };

  return (
    <>
    <SearchInput query={query} setQuery={setQuery} handleSearch={handleSearch} />
    <SearchResults posts={posts} />
    </>
  );
};

export default SearchPage;
