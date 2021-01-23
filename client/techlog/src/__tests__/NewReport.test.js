import React from 'react';
import NewReport from '../Components/NewReport/NewReport';
import Form from '../Form/Form';
import { screen, getByLabelText, render, fireEvent, getByRole, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'



describe ('New Report', () => {

  it('Should render submit button on ‘new’ page', async (done) => {
    render(<Form/>)
    await waitFor(() => screen.getByRole('button', {name: 'formSubmit'}))
    expect(screen.getByRole('button', {name: /formSubmit/i})).toHaveTextContent('SUBMIT');
    done();
  })

})

