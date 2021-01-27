import React from 'react';

import './FormSearchTags.css'


const FormSearchTags = (props) => {
  const { 
    form, 
    customTagHandler, 
    handleSearchTagClick, 
    handlePresetTagClick, 
    tagInputRef, 
    handleCheckboxTag, 
  } = props;
  
  return(
    <div className="report__search-tags">
    {form &&

    <div className="report__search-tags__fixed">

    <label>Search Tags</label>

        <p>Manufacturer</p>
        <hr></hr>
        <div className="search-tag__fixed__section">
          <div className="search-tag__fixed">
            <p>Kystdesign</p>
            <input 
              type="checkbox" 
              className="search-tag__checkbox" 
              value="kyst"
              onChange={handleCheckboxTag}
            />
          </div>
          <div className="search-tag__fixed">
            <p>Schilling Robotics</p>
            <input
              type="checkbox" 
              className="search-tag__checkbox" 
              value="schilling"
              onChange={handleCheckboxTag}
            />
          </div>
          <div className="search-tag__fixed">
            <p>Reach</p>
            <input 
              type="checkbox" 
              className="search-tag__checkbox" 
              value="reach"
              onChange={handleCheckboxTag}
            />
          </div>
        </div>
          
        <p>Item</p>
        <hr></hr>
        <div className="search-tag__fixed__section">
          <div className="search-tag__fixed">
            <p>ROV</p>
            <input 
              type="checkbox" 
              className="search-tag__checkbox" 
              value="ROV"
              onChange={handleCheckboxTag}
            />
          </div>
          <div className="search-tag__fixed">
            <p>TMS</p>
            <input 
              type="checkbox" 
              className="search-tag__checkbox" 
              value="TMS"
              onChange={handleCheckboxTag}
            />
          </div>
          <div className="search-tag__fixed">
            <p>Winch</p>
            <input 
              type="checkbox" 
              className="search-tag__checkbox" 
              value="winch"
              onChange={handleCheckboxTag}
            />
          </div>
          <div className="search-tag__fixed">
            <p>Sensor</p>
            <input 
              type="checkbox" 
              className="search-tag__checkbox" 
              value="sensor"
              onChange={handleCheckboxTag}
            />
          </div>
        </div>

        <p>Equipment</p>
        <hr></hr>
        <div className="search-tag__fixed__section">
        <div className="search-tag__fixed">
            <p>Manipulator</p>
            <input 
              type="checkbox" 
              className="search-tag__checkbox" 
              value="manipulator"
              onChange={handleCheckboxTag}
            />
          </div>
          <div className="search-tag__fixed">
            <p>Gyro</p>
            <input 
              type="checkbox" 
              className="search-tag__checkbox" 
              value="gyro"
              onChange={handleCheckboxTag}
            />
          </div>
          <div className="search-tag__fixed">
            <p>Altimeter</p>
            <input 
              type="checkbox" 
              className="search-tag__checkbox" 
              value="altimeter"
              onChange={handleCheckboxTag}
            />
          </div>
          <div className="search-tag__fixed">
            <p>Motor</p>
            <input 
              type="checkbox" 
              className="search-tag__checkbox" 
              value="motor"
              onChange={handleCheckboxTag}
            />
          </div>
          <div className="search-tag__fixed">
            <p>Pump</p>
            <input 
              type="checkbox" 
              className="search-tag__checkbox" 
              value="pump"
              onChange={handleCheckboxTag}
            />
          </div>
        </div>

    </div>}

    <div className="report__search-tags__custom">
      {form ? <label>Tags</label> : <label>Custom Tags</label>}
      <ul id="custom__tag__hook">
        {
          //! tags !== searchTags
          form.tags && form.tags.map((tag, index) => (
            <li key={index} onClick={(e) => handlePresetTagClick(e, index)} className="search-tag__custom">#{tag}</li>)
          )
        }
        {
          form.searchTags && form.searchTags.map((tag, index) => (
            <li key={index} onClick={(e) => handleSearchTagClick(e, index)} className="search-tag__custom">#{tag}</li>)
          )
        }
        
      </ul>
      <div className="report__search-tags__input">
        <label hidden={true} htmlFor="custom__tag__input">custom__tag__input</label>
        <input ref={tagInputRef} id="custom__tag__input" name="custom__tag" type="text"></input>
        <button onClick={customTagHandler}>ADD TAG</button>
      </div>
    </div>

  </div>
  )

}

export default FormSearchTags;