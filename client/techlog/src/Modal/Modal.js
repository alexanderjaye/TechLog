import React, {Fragment} from 'react';

import './Modal.css';

import { modalAnimationOut } from '../Utils/animations';

import rest from '../Utils/rest';

const Modal = ({admin, id, title, tags, description, steps, toggleModal, callReports}) => {

  const deleteReport = () => {
    rest.deleteReport(id);
    callReports();
    toggleModal(); 
  }

  const closeModal =() => {
    //modalAnimationOut();
    toggleModal();
  }


  return (
    <Fragment>
    <div className="modal__container">

      <h2>{title}</h2>

      <div className="modal__id">
        <label>Report ID: </label>
        {id}
      </div>

      <div className="modal__tags">
        <label>Tags</label>
        <ul>{tags.map((tag, index) => <li key={index}>#{tag}</li>)}</ul>
      </div>
     
      <div className="modal__main-body">
        <label>Description</label>
        <p>{description}</p>
        <label>Steps</label>
        <ul>{steps.map((step, index) => <li key={index}>{index + 1}. {step}</li>)}</ul>
      </div>

      <div className="modal__buttons">
        <button onClick={closeModal}>CLOSE</button>
        {admin &&
          <button onClick={deleteReport}>DELETE</button> 
        }
      </div>
    </div>
    </Fragment>
  ) 
}

export default Modal;