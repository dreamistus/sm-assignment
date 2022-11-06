/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Input from 'components/Input';
import type { Post } from 'types/posts';

import Select from './LabeledSelect';
import PostItem from './PostItem';
import SortDirectionPicker from './SortDirectionPicker';

import styles from './Posts.module.scss';

const pageNumbers = Array.from(Array(10), (_, index) => index + 1);

interface PostsProps {
  posts: Post[];
  isDescending: boolean;
  page: number;
  onIsDescendingToggled: VoidFunction;
  onPostsFilterChanged: React.ChangeEventHandler<HTMLInputElement>;
  onPageNumberChanged: React.ChangeEventHandler<HTMLSelectElement>;
}

const Posts: React.FC<PostsProps> = ({
  posts,
  isDescending,
  page,
  onIsDescendingToggled,
  onPostsFilterChanged,
  onPageNumberChanged
}) => (
  <section>
    <header className={ styles.header }>
      <SortDirectionPicker isDescending={ isDescending } onToggle={ onIsDescendingToggled } />
      <Select id="pages-select" label="Choose a page:" options={ pageNumbers } selected={ page } onChange={ onPageNumberChanged } />
      <Input stretch placeholder="Search post" onChange={ onPostsFilterChanged } />
    </header>
    <ul>
      { posts.map(post => <PostItem key={ post.id } { ...post } />) }
    </ul>
  </section>
);
export default React.memo(Posts);
