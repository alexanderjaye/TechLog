import React from 'react';

import './NewReport.css';

import rest from '../../Utils/rest';

import Form from '../../Form/Form'

const NewReport = () => {

  const formSubmit = (title, searchTags, description, steps) => {
    rest.postReport(title, searchTags, description, steps);
  }

  return (
    <div className="new__report__container">
      <Form
        formSubmit={formSubmit}
      />
    </div>
  )
}

export default NewReport;