import React from 'react';

import FormCheckbox from './FormCheckbox';

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

  const manufacturers = [
    { title: 'Kystdesign', tagValue: 'kyst'},
    { title: 'Schilling Robotics', tagValue: 'schilling'},
    { title: 'Reach', tagValue: 'reach'},
  ];
  
  const items = [
    { title: 'ROV', tagValue: 'ROV'},
    { title: 'TMS', tagValue: 'TMS'},
    { title: 'Winch', tagValue: 'winch'},
    { title: 'Sensor', tagValue: 'sensor'},
  ];

  const equipments = [
    { title: 'Manipulator', tagValue: 'manipulator'},
    { title: 'Gyro', tagValue: 'gyro'},
    { title: 'Altimeter', tagValue: 'altimeter'},
    { title: 'Motor', tagValue: 'motor'},
    { title: 'Pump', tagValue: 'pump'},
  ];
  

  return(
    <div className="report__search-tags">
    {
      form &&

      <div className="report__search-tags__fixed">
      <label>Search Tags</label>
          <p>Manufacturer</p>
          <hr></hr>
          <div className="search-tag__fixed__section">
            {
              manufacturers.map((m) => (
                <FormCheckbox title={m.title} tagValue={m.tagValue} handleCheckboxTag={handleCheckboxTag} form={form}/>
              ))
            }
          </div>
          <p>Item</p>
          <hr></hr>
          
          <div className="search-tag__fixed__section">
            {
              items.map((i) => (
                <FormCheckbox title={i.title} tagValue={i.tagValue} handleCheckboxTag={handleCheckboxTag} form={form}/>
              ))
            }
          </div>

          <p>Equipment</p>
          <hr></hr>
          <div className="search-tag__fixed__section">
            {
              equipments.map((e) => (
                <FormCheckbox title={e.title} tagValue={e.tagValue} handleCheckboxTag={handleCheckboxTag} form={form}/>
              ))
            }
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