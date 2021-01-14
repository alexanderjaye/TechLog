import React from 'react';

import './GetForm.css';

const GetForm = ({ formFetch }) => {

  const getReport = () => {
    const reportId = document.getElementById('report__id');
    formFetch(reportId.value);
    reportId.value = '';
  }

  return (
    <div>
      <label>Report ID:</label>
      <input id="report__id" name="report__id" type="text"></input>
      <button onClick={getReport}>FIND</button>
    </div>
  )
}

export default GetForm;