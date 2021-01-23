import React from 'react';
import NewReport from '../Components/NewReport/NewReport';
import { Form } from '../Form/Form';
import { MemoryRouter } from 'react-router-dom';
import { screen, getByLabelText, render, fireEvent, getByRole, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';



describe ('New Report', () => {

  it('Should render submit button on ‘new’ page', async () => {
    render(<MemoryRouter><NewReport/></MemoryRouter>);
    // await screen.findByRole('button' { name: 'formSubmit' });
    expect(screen.getByRole('button', {name: 'SUBMIT'})).toBeInTheDocument();
  });

})

