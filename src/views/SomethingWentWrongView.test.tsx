import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundView from './NotFoundView';
import SomethingWentWrongView from './SomethingWentWrongView';

test('renders something went wrong text', () => {
  render(<SomethingWentWrongView />);
  const element = screen.getByRole('heading', {name: 'Something went wrong'})
  expect(element).toBeInTheDocument();
});
