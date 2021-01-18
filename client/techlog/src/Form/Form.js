import React, { useState, useEffect } from 'react';

import { withRouter, useLocation } from 'react-router-dom';

import { formAnimations } from '../Utils/animations';

import SearchTags from './SearchTags';

import './Form.css';

//Note formSubmit comes from NewReport.js, and formPatch from EditReport.js
const Form = ( { formSubmit, formPatch, form, history } ) => {

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
      if (location.pathname === '/new') formSubmit(title, searchTags, description, steps);
      else if (location.pathname === '/edit') formPatch(title, searchTags, description, steps);
      
      setCustomTags([]);
      setSteps([]);
      formReset();
      redirect();
    }

    const redirect = () => {
      history.push('/search');
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

      //Make copy of current tags state
      const customTagsCopy = [...customTags];

      //get all populated checkboxes
      const checkBoxes = document.querySelectorAll('.search-tag__checkbox');
      checkBoxes.forEach(checkbox => {
        if (checkbox.checked) 
          searchTags.push(checkbox.value);
        }
      );

      //Get all rendered tags
      const renderedTagLI = document.querySelectorAll('.search-tag__custom');
      const renderedTags = [];
      renderedTagLI.forEach(value => renderedTags.push(value.innerText.substring(1))); 
      
      //merge all tags
      searchTags = [...searchTags, ...customTagsCopy, ...renderedTags];
      return searchTags;
    }
  
    //Appends custom tags to DOM and updates state
    const customTagHandler = (event) => {
      event.preventDefault();
      const customTag = document.getElementById('custom__tag__input').value;
      if (customTag === '') return;
      //Set tag state
      const customTagsCopy = [...customTags];
      customTagsCopy.push(customTag);
      setCustomTags(customTagsCopy);
      //Append new tag to DOM
      const newTag = document.createElement('li');
      newTag.textContent = `#${customTag}`;
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

    //Event listener to remove steps
    useEffect( () => {
      document.querySelector('.report__steps').addEventListener('click', (event)=> {
        if (event.target.tagName === 'LI') event.target.parentNode.removeChild(event.target);
      })}, 
    []);

    useEffect(()=>{
      formAnimations();
    },[]);

  return (
    <form className="form__container" onSubmit={formHandler} spellCheck="false">

      <div className="report__title">
          <label>Report Title</label>
          <input id="report__title__input" 
                 name="title" 
                 type="text" 
                 defaultValue={form ? form.title : ''}>
          </input>
      </div>

      <SearchTags
        form={form}
        customTagHandler={customTagHandler}
      />

      <div className="report__description">
        <label>Description</label>
        <textarea id="report__description__input" rows="10" cols="30" defaultValue={form ? form.description : ''}></textarea>
      </div>

      <div className="report__steps">
          <label>Steps</label>
          <div className="report__steps__input">
            <input id="add__step" type="text"></input>
            <button onClick={addStepHandler}>ADD STEP</button>
          </div>
          <ul id="report__steps__hook">{form && form.steps.map((step, index) => 
          <li key={index}>{index + 1}. {step}</li>)}</ul>
      </div>

      <input className="report__submit__btn" type="submit" value="SUBMIT"/>

    </form>
  )
}

export default withRouter(Form);
