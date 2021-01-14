import React, { useState } from 'react';

import './NewReport.css';

import rest from '../../Utils/rest';

const NewReport = () => {

  const [customTags, setCustomTags] = useState([]);
  const [stepsState, setSteps] = useState([]);

  //Form submit handler
  const formHandler = (event) => {
    event.preventDefault();
    const title = document.getElementById('newreport__title__input').value;
    const searchTags = tagsHandler();
    const description = document.getElementById('newreport__description__input').value;
    const steps = stepsState;
    if (title === '' || searchTags.length === 0 || description === '') {
      console.log('Missing fields!');
      return;
    }
    else {
      rest.postReport(title, searchTags, description, steps);
    }
    formReset();
  }

  //Form field reset
  const formReset = () => {
    document.getElementById('newreport__title__input').value = ''; 
    const checkBoxs = document.querySelectorAll('.search-tag__checkbox');
    checkBoxs.forEach(checkbox => checkbox.checked = false);
    document.getElementById('custom__tag__hook').innerHTML = '';
    document.getElementById('newreport__description__input').value = '';
    document.getElementById('newreport__steps__hook').innerHTML = '';
  }

  //On form submit, merges checkbox tags and custom tags
  const tagsHandler = () => {
    let searchTags = [];
    const checkBoxes = document.querySelectorAll('.search-tag__checkbox');
    checkBoxes.forEach(checkbox => {
      if (checkbox.checked) 
        searchTags.push(`#${checkbox.value}`)
      }
    );
    const customTagsCopy = [...customTags];
    searchTags = [...searchTags, ...customTagsCopy];
    return searchTags;
  }

  //Appends custom tags to DOM and updates state
  const customTagHandler = (event) => {
    event.preventDefault();
    const customTag = document.getElementById('custom__tag__input').value;
    if (customTag === '') return;
    //Set tag state
    const customTagsCopy = [...customTags];
    customTagsCopy.push(`#${customTag}`);
    setCustomTags(customTagsCopy);
    //Append new tag to DOM
    const newTag = document.createElement('li');
    newTag.textContent = customTag;
    document.getElementById('custom__tag__hook').appendChild(newTag);
    document.getElementById('custom__tag__input').value = '';
  }

  //Add steps to DOM and updates state
  const addStepHandler = (event) => {
    event.preventDefault();
    const customStep = document.getElementById('add__step').value;
    if (customStep === '') return;
    //Set steps state
    const customStepsCopy = [...stepsState];
    customStepsCopy.push(customStep);
    setSteps(customStepsCopy);
    //Append new step to DOM
    const stepsHook = document.getElementById('newreport__steps__hook');
    const newStep = document.createElement('li');
    newStep.textContent = customStep;
    stepsHook.appendChild(newStep);
    document.getElementById('add__step').value='';
  }

  return (
    <div className="newreport__container">
      <h1>NewReport</h1>
      <form onSubmit={formHandler} spellCheck="false">
        <div className="newreport__title">
            <label>Title</label>
            <input id="newreport__title__input"name="title" type="text"></input>
        </div>
        <div className="newreport__search-tags">
            <label>Search Tags</label>
            <div className="newreport__search-tags__fixed">
              <label>Kyst</label>
              <input type="checkbox" id="kyst__tag" className="search-tag__checkbox" value="kyst"/>
              <label>HD</label>
              <input type="checkbox" id="hd__tag" className="search-tag__checkbox" value="hd"/>
            </div>
            <div className="newreport__search-tags__custom">
              <label>Custom Tag</label>
              <input id="custom__tag__input" name="custom__tag" type="text"></input>
              <button onClick={customTagHandler}>ADD CUSTOM TAG</button>
            </div>
            <ul id="custom__tag__hook"></ul>
        </div>
        <div className="newreport__description">
          <label>Description</label>
          <textarea id="newreport__description__input" rows="10" cols="30"></textarea>
        </div>
        <div className="newreport__steps">
            <ul id="newreport__steps__hook"></ul>
            <input id="add__step" type="text"></input>
            <button onClick={addStepHandler}>ADD STEP</button>
        </div>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
}

export default NewReport;