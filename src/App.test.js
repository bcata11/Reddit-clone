import React from 'react';
import { render, screen, fireEvent, getByText, queryAllByText  } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Searchbar from './features/searchBar/Searchbar';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import expect from 'chai/lib/chai/interface/expect';
import '@testing-library/jest-dom';
import Subreddits from './features/subreddits/subreddit';

// Mock useDispatch hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));



test('renders searchbar component', () => {
  // Mock dispatch function
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);
  // Render Searchbar component
  const { getByText } = render(
    <BrowserRouter>
      <Searchbar />
    </BrowserRouter>
  );
  const searchbarElement = getByText('by cata');
  expect(searchbarElement).toBeInTheDocument();
});

import { MemoryRouter, Route, Routes } from "react-router-dom";

test('renders', () => {
  render(
    <MemoryRouter>
			<Routes>
				<Route path="/" element={<Subreddits />} />
			</Routes>
		</MemoryRouter>
  )
})
