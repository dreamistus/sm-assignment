/* eslint-disable react/jsx-props-no-spreading */
import { render, screen } from '@testing-library/react';
import { Post } from 'types/posts';

import PostItem from '.';

const mockPost: Post = {
  id: 'post6365384172572_79b16a5d',
  from_name: 'Britany Heise',
  from_id: 'user_4',
  message: 'use pray rib union foreigner avenue',
  type: 'status',
  created_time: '2022-11-03T01:56:09+00:00'
};

test('renders a post', () => {
  render(
    <PostItem { ...mockPost } />
  );

  expect(screen.getByText(`${ mockPost.created_time } by ${ mockPost.from_name }`)).toBeInTheDocument();
  expect(screen.getByText(mockPost.message)).toBeInTheDocument();
});
