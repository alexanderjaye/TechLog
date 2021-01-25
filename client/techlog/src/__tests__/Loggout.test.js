import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, getByLabelText, render, fireEvent, getByRole, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Authorised from '../Components/App/Authorised';

//? how to test across pages navigated?
//? Router History Provider?

describe('Loggout page', () => {

  beforeEach(() => {
    render(<MemoryRouter><Authorised/></MemoryRouter>);
  });
  
  it('Should navigate to Log In page when clicking "Logout"', () => {
    const logoutButton = screen.getByText(/log ?out/i);
    fireEvent.click(logoutButton)
    expect(screen.getByText(/log ?in/i)).toBeInTheDocument;
  })

  it('Should remove other navigation links on Log In page', () => {
    const searchLink = screen.getByText(/search/i);
    const newLink = screen.getByText(/new/i);
    const logoutButton = screen.getByText(/log ?out/i);
    fireEvent.click(logoutButton)
    expect(newLink).not.toBeInTheDocument;
    expect(searchLink).not.toBeInTheDocument;
  })

  // it('Should return to search page when logging in as User or Admin', () => {
    
  // })

})