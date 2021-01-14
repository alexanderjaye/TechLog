import React from 'react';

import './SearchTags.css';

const SearchTags = ({tag, deleteTagHandler}) => {

  return (
    <div className="searchtag__frag">
      <li className="searchtag__tag">{tag}</li>
      <button onClick={deleteTagHandler}>X</button>
    </div>
  )
}

export default SearchTags;