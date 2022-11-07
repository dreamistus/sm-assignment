import { fireEvent, render, screen } from '@testing-library/react';

import Button from '.';

test('renders Button', () => {
  const mockOnClick = jest.fn();

  render(<Button text="test_button" type="button" onClick={ mockOnClick } />);

  const button = screen.getByText('test_button');
  fireEvent.click(button);

  expect(button).toBeInTheDocument();
  expect(mockOnClick).toBeCalledTimes(1);
});
