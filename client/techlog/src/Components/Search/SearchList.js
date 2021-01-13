import React from 'react';

import './SearchList.css';

import SearchBar from './SearchBar';
import SearchItem from './SearchItem';

const SearchList = () => {
  return (
    <div>
      <h1>SearchList</h1>
      <SearchBar/>
      <SearchItem/>
    </div>
  )
}

export default SearchList;