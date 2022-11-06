/* eslint-disable react/jsx-props-no-spreading */
import { render, screen } from '@testing-library/react';
import { Sender } from 'types/posts';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import SenderItem from '.';

const mockSender: Sender = {
  id: 'user_4',
  name: 'Britany Heise',
  postsCount: 4
};

test('renders SenderItem', () => {
  const { container } = render(
    <BrowserRouter>
      <SenderItem { ...mockSender } />
    </BrowserRouter>
  );

  expect(container.getElementsByClassName('sender--selected').length).toBe(0);
  expect(screen.getByText(`${ mockSender.name } (${ mockSender.postsCount })`)).toBeInTheDocument();
});

test('renders selected SenderItem', () => {
  const { container } = render(
    <BrowserRouter>
      <SenderItem { ...mockSender } isSelected />
    </BrowserRouter>
  );

  expect(container.getElementsByClassName('sender--selected').length).toBe(1);
  expect(screen.getByText(`${ mockSender.name } (${ mockSender.postsCount })`)).toBeInTheDocument();
});
