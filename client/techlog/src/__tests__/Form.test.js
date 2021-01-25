import React from 'react';
import NewReport from '../Components/NewReport/NewReport';
import Form from '../Form/Form';
import { MemoryRouter } from 'react-router-dom';
import { screen, getByLabelText, render, fireEvent, getByRole, waitFor, getByText } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Form input', () => {
  
  it('Should pesist input text when element not in focus', () => {
    render(<MemoryRouter><Form /></MemoryRouter>);
    const titleInput = screen.getByLabelText(/report title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    // input text into field
    fireEvent.change(titleInput, {target: {value: 'banana'}});
    // click away
    fireEvent.click(descriptionInput);
    // check text has persisted
    expect(titleInput.value).toBe('banana');
    // check again with description box
    fireEvent.change(descriptionInput, {target: {value: 'apple'}});
    fireEvent.click(titleInput);
    expect(descriptionInput.value).toBe('apple');
  })

  // it('Should submit when button pressed', () => {
    


  // })

})