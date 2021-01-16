import React from 'react';

import './GetForm.css';

const GetForm = ({ formFetch }) => {

  const getReport = () => {
    const reportId = document.getElementById('report__id');
    formFetch(reportId.value);
    reportId.value = '';
  }

  return (
    <div className="getform__container">
      <div className="getform__input">
        <h3>REPORT ID:</h3>
        <input id="report__id" name="report__id" type="text"></input>
        <button onClick={getReport}>FIND REPORT</button>
      </div>
    </div>
  )
}

export default GetForm;