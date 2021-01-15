import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import './Form.css';

//Note formSubmit comes from NewReport.js, and formPatch from EditReport.js
const Form = ( { formSubmit, formPatch, form } ) => {

  const [customTags, setCustomTags] = useState([]);
  const [stepsState, setSteps] = useState([]);

  const location = useLocation();

    //Form submit handler
    const formHandler = (event) => {
      event.preventDefault();
      const title = document.getElementById('report__title__input').value;
      const searchTags = tagsHandler();
      const description = document.getElementById('report__description__input').value;
      const steps = stepsState;

      //Form validation
      if (title === '' || searchTags.length === 0 || description === '') {
        console.log('Missing fields!');
        return;
      }

      //Check what route currently on - if new, formSubmit, and if edit, formPatch
      if (location.pathname === '/new') {
        console.log('submit');
        formSubmit(title, searchTags, description, steps);
      } else if (location.pathname === '/edit') {
        console.log('patch');
        formPatch(title, searchTags, description, steps);
      }
  
      formReset();
    }
  
    //Form field reset
    const formReset = () => {
      document.getElementById('report__title__input').value = ''; 
      const checkBoxs = document.querySelectorAll('.search-tag__checkbox');
      checkBoxs.forEach(checkbox => checkbox.checked = false);
      document.getElementById('custom__tag__hook').innerHTML = '';
      document.getElementById('report__description__input').value = '';
      document.getElementById('report__steps__hook').innerHTML = '';
    }
  
    //On form submit, merges checkbox tags and custom tags
    const tagsHandler = () => {
      let searchTags = [];
      const checkBoxes = document.querySelectorAll('.search-tag__checkbox');
      checkBoxes.forEach(checkbox => {
        if (checkbox.checked) 
          //searchTags.push(`#${checkbox.value}`)
          searchTags.push(checkbox.value);
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
      //customTagsCopy.push(`#${customTag}`);
      customTagsCopy.push(customTag);
      setCustomTags(customTagsCopy);
      //Append new tag to DOM
      const newTag = document.createElement('li');
      //const deleteBtn = document.createElement('button');
      newTag.textContent = customTag;
      //newTag.appendChild(deleteBtn);
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
      const stepsHook = document.getElementById('report__steps__hook');
      const newStep = document.createElement('li');
      newStep.textContent = customStep;
      stepsHook.appendChild(newStep);
      document.getElementById('add__step').value='';
    }

    //Event listener to remove tags
    useEffect( () => {
      document.querySelector('.report__search-tags').addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') event.target.parentNode.removeChild(event.target);
      })},
    []);

    //Event listener to remove steps
    useEffect( () => {
      document.querySelector('.report__steps').addEventListener('click', (event)=> {
        if (event.target.tagName === 'LI') event.target.parentNode.removeChild(event.target);
      })}, 
    []);


  return (
    <form className="form__container" onSubmit={formHandler} spellCheck="false">

      <div className="report__title">
          <label>Title</label>
          <input id="report__title__input"name="title" type="text" defaultValue={form ? form.title : ''}></input>
      </div>

      <div className="report__search-tags">
        <label>Search Tags</label>
        
        {
          //The checkboxes  will only render in 'newReport' - no 'editReport'
        }
        {form ? null :
        <div className="report__search-tags__fixed">
          <label>Kyst</label>
          <input type="checkbox" id="kyst__tag" className="search-tag__checkbox" value="kyst"/>
          <label>HD</label>
          <input type="checkbox" id="hd__tag" className="search-tag__checkbox" value="hd"/>
        </div> }

        <div className="report__search-tags__custom">
          <label>Custom Tag</label>
          <input id="custom__tag__input" name="custom__tag" type="text"></input>
          <button onClick={customTagHandler}>ADD CUSTOM TAG</button>
        </div>
        <ul id="custom__tag__hook">{form && form.tags.map((tag, index) => 
          <li key={index}>{tag}</li>)}
        </ul>

      </div>

      <div className="report__description">
        <label>Description</label>
        <textarea id="report__description__input" rows="10" cols="30" defaultValue={form ? form.description : ''}></textarea>
      </div>

      <div className="report__steps">
          <ul id="report__steps__hook">{form && form.steps.map((step, index) => 
          <li key={index}>{step}</li>)}</ul>
          <input id="add__step" type="text"></input>
          <button onClick={addStepHandler}>ADD STEP</button>
      </div>

      <input type="submit" value="Submit"/>

    </form>
  )
}

export default Form;
