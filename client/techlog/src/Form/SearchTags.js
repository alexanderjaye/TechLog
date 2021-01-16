import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './SearchTags.css'

const SearchTags = ({form, customTagHandler}) => {

  const location = useLocation();
  
  //Event listener to remove tags
  useEffect( () => {
    document.querySelector('.report__search-tags').addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') event.target.parentNode.removeChild(event.target);
    })},
  []);

  return(
    <div className="report__search-tags">
    {form ? null :

    <div className="report__search-tags__fixed">

    <label>Search Tags</label>

        <p>Manufacturer</p>
        <hr></hr>
        <div className="search-tag__fixed__section">
          <div className="search-tag__fixed">
            <p>Kyst</p>
            <input type="checkbox" className="search-tag__checkbox" value="kyst"/>
          </div>
          <div className="search-tag__fixed">
            <p>Schilling</p>
            <input type="checkbox" className="search-tag__checkbox" value="schilling"/>
          </div>
        </div>
          
        <p>Item</p>
        <hr></hr>
        <div className="search-tag__fixed__section">
          <div className="search-tag__fixed">
            <p>ROV</p>
            <input type="checkbox" className="search-tag__checkbox" value="ROV"/>
          </div>
          <div className="search-tag__fixed">
            <p>TMS</p>
            <input type="checkbox" className="search-tag__checkbox" valu="TMS"/>
          </div>
          <div className="search-tag__fixed">
            <p>Winch</p>
            <input type="checkbox" className="search-tag__checkbox" value="winch"/>
          </div>
        </div>

        <p>Equipment</p>
        <hr></hr>
        <div className="search-tag__fixed__section">
          <div className="search-tag__fixed">
            <p>Gyro</p>
            <input type="checkbox" className="search-tag__checkbox"/>
          </div>
          <div className="search-tag__fixed">
            <p>Altimeter</p>
            <input type="checkbox" className="search-tag__checkbox"/>
          </div>
          <div className="search-tag__fixed">
            <p>Motor</p>
            <input type="checkbox" className="search-tag__checkbox"/>
          </div>
          <div className="search-tag__fixed">
            <p>Pump</p>
            <input type="checkbox" className="search-tag__checkbox"/>
          </div>
        </div>

    </div>}

    <div className="report__search-tags__custom">
      {form ? <label>Tags</label> : <label>Custom Tags</label>}
      <ul id="custom__tag__hook">{form && form.tags.map((tag, index) => 
        <li key={index} className="search-tag__custom">#{tag}</li>)}
      </ul>
      <div className="report__search-tags__input">
        <input id="custom__tag__input" name="custom__tag" type="text"></input>
        <button onClick={customTagHandler}>ADD TAG</button>
      </div>
    </div>

  </div>
  )

}

export default SearchTags;