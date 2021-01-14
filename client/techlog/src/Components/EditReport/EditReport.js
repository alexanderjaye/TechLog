import React, { useState } from 'react';

import './EditReport.css';

import rest from '../../Utils/rest';

import GetForm from '../../Form/GetForm'
import Form from '../../Form/Form'

const EditReport = () => {

  const [formEditState, setFormEdit] = useState(null);

  const formFetch = async (reportId) => {
    const report = await rest.getReport(reportId);
    setFormEdit(report);
  }

  const formPatch = () => {
    return
  } 

  return (
    <div className="edit__report__container">
    <h1>EditReport</h1>
    {formEditState === null ? <GetForm formFetch={formFetch}/> :
    <Form form={formEditState} formPatch={formPatch}/>}
  </div>
  )
}

export default EditReport;