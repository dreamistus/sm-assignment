import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'store';

import LoginPage from '.';

test('renders LoginPage', () => {
  render(
    <Provider store={ store }>
      <LoginPage />
    </Provider>
  );

  expect(screen.getByLabelText('Name')).toBeInTheDocument();
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeDisabled();
});
