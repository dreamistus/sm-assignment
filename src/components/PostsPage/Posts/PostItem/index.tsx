import React from 'react';
import { Post } from 'types/posts';

import styles from './PostItem.module.scss';

const PostItem: React.FC<Post> = ({
  message,
  created_time,
  from_name
}) => (
  <li className={ styles.post } role="article">
    <header className={ styles.post__header }>
      { `${ created_time } by ${ from_name }` }
    </header>
    <p className={ styles.post__message }>
      { message }
    </p>
  </li>
);

export default React.memo(PostItem);
