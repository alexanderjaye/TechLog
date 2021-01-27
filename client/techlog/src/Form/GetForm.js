import React, { useState } from 'react';

import './GetForm.css';

const GetForm = ({ editReport, formFetch }) => {
  const [localReportId, setLocalReportId] = useState('')

  const getReport = () => {
    formFetch(localReportId);
    setLocalReportId('');
  }

  const pasteId = () => {
    setLocalReportId(editReport);
    
  }

  const handleReportId = (e) => {
    setLocalReportId(e.target.value);
  }

  return (
    <div className="getform__container">
      <div className="getform__input">
        <h3>REPORT ID:</h3>
        <input 
          id="report__id" 
          name="report__id" 
          type="text"
          value={localReportId}
          onChange={handleReportId}
        />
        <button onClick={getReport}>FIND REPORT</button>
        {(editReport !== 0) ? 
          <button onClick={pasteId}>PASTE ID</button> :
          null
        }
      </div>
    </div>
  )
}

export default GetForm;