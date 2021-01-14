import React from 'react';

import './Modal.css';

import rest from '../Utils/rest';

const Modal = ({admin, id, title, toggleModal, callReports}) => {

  const deleteReport = () => {
    rest.deleteReport(id);
    callReports();  
  }

  console.log(admin);

  return (
    <div className="modal__container">
      {title}
      <button onClick={toggleModal}>CLOSE</button>
      {admin &&
        <button onClick={deleteReport}>DELETE</button> 
      }
    </div>
  ) 
}

export default Modal;