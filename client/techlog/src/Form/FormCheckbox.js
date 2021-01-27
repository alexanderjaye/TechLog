import React from 'react'

const FormCheckbox = (props) => {
  const { title, tagValue, handleCheckboxTag, form } = props;
  return (
    <div className="search-tag__fixed">
      <p>{title}</p>
      <input 
        type="checkbox" 
        className="search-tag__checkbox" 
        value={tagValue}
        onChange={handleCheckboxTag}
        checked={form.tags.includes(tagValue)}
      />
    </div>
  )
}









export default FormCheckbox
