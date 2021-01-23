import React from 'react';
import NewReport from '../Components/NewReport/NewReport';
import { Form } from '../Form/Form';
import { MemoryRouter } from 'react-router-dom';
import { screen, getByLabelText, render, fireEvent, getByRole, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';



describe ('New Report', () => {

  beforeEach(() => {
    render(<MemoryRouter><NewReport/></MemoryRouter>);
  });

  it('Should render submit button on ‘new’ page', async () => {
    expect(screen.getByRole('button', {name: 'SUBMIT'})).toBeInTheDocument();
  });

  it('Should render a tag to tag list', () => {
    const testTag = 'testTag'
    fireEvent.change(screen.getByLabelText('custom__tag__input'), {
      target: { value: testTag }
    });
    fireEvent.click(screen.getByRole('button', { name: 'ADD TAG'}));
    expect(screen.getByText('#' + testTag)).toBeInTheDocument();
  });
})

