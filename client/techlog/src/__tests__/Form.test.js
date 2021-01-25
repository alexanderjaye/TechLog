import React from 'react';
import NewReport from '../Components/NewReport/NewReport';
import Form from '../Form/Form';
import { MemoryRouter } from 'react-router-dom';
import { screen, getByLabelText, render, fireEvent, getByRole, waitFor, getByText } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Form input', () => {
  
  it('Should update state when text is input', () => {
    render(<MemoryRouter><Form /></MemoryRouter>);
    const titleInput = screen.getByLabelText(/report title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    // input text into field
    fireEvent.change(titleInput, {target: {value: 'banana'}});
    // click away
    fireEvent.click(descriptionInput);
    // check text has persisted
    expect(screen.getByText('banana')).toBeInTheDocument();

    

  })

  // it('Should submit when button pressed', () => {
    


  // })

})