import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, getByLabelText, render, fireEvent, getByRole, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchList from '../Components/Search/SearchList';
import SearchBar from '../Components/Search/SearchBar';

describe('Search Reports', () => {
  
  it('should render dummy data to item list', async () => {
    const dummyReports = [
      {
        title: 'Report 1',
        description: 'test test test',
        tags: ['tag1', 'tag2'],
        steps: ['step1', 'step2'],
        images: [],
        reportId: 12345678,
        _id: '2345'
      },
      {
        title: 'Report 2',
        description: 'test test test',
        tags: ['tag3', 'tag4'],
        steps: ['step3', 'step4'],
        images: [],
        reportId: 12345679,
        _id: '2346'
      },
    ];
    
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(dummyReports)
      })
    );

    await act(async () => {
      render(<MemoryRouter><SearchList/></MemoryRouter>);
    });

    expect(screen.getByText(dummyReports[0].title)).toBeInTheDocument();
    expect(screen.getByText(dummyReports[1].title)).toBeInTheDocument();
  });

  it('Should render input search tag to tag list', async () => {
    const dummyReports = [];

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(dummyReports)
      })
    );

    await act(async () => {
      render(<MemoryRouter><SearchList/></MemoryRouter>);
    });

    const testTag = 'testTag';
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: testTag }
    });
    fireEvent.click(screen.getByRole('button', {name: 'ADD TAG'}));
    expect(screen.getByText('#' + testTag)).toBeInTheDocument();
    
  });

  

  
});
