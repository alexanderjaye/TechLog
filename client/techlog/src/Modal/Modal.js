import React from 'react';

import './Modal.css';

import rest from '../Utils/rest';

const Modal = ({admin, id, title, tags, description, steps, toggleModal, callReports}) => {

  const deleteReport = () => {
    rest.deleteReport(id);
    callReports();  
  }

  console.log(admin);

  return (
    <div className="modal__container">
      <h2>{title}</h2>
      <p>Report ID</p>
      {id}
      <p>Tags</p>
      <ul>{tags.map((tag, index) => <li key={index}>{tag}</li>)}</ul>
      <p>Description</p>
      {description}
      <p>Steps</p>
      <ul>{steps.map((step, index) => <li key={index}>{step}</li>)}</ul>
      <button onClick={toggleModal}>CLOSE</button>
      {admin &&
        <button onClick={deleteReport}>DELETE</button> 
      }
    </div>
  ) 
}

export default Modal;