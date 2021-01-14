import React from 'react';

import './SearchItem.css';

import SearchItemTag from './SearchItemTag';


const SearchItem = ( {title, tags, searchTags} ) => {

  const checkTags = () => {
    let flag = true;
    searchTags.forEach(searchTag => {
      if (!tags.includes(searchTag)) flag = false;
    })
    return flag;
  }

  if (!checkTags()) {
    return null;
  }

  return (
    <div className="searchitem__container">
      <h3>{title}</h3>
      <ul>
        {tags.map((tag, index) => <SearchItemTag key={index} tag={tag}/>)}
      </ul>
    </div>
  )
}

export default SearchItem;