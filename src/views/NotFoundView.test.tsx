import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundView from './NotFoundView';

test('renders not found text', () => {
  render(<NotFoundView />);
  // const linkElement = screen.getByText(/Not found./i);
  const element = screen.getByRole('heading', {name: 'Not found.'})
  expect(element).toBeInTheDocument();
});
