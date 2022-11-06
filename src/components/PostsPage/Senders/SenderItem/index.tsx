import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Sender } from 'types/posts';

import styles from './Sender.module.scss';

const cn = classNames.bind(styles);

interface SenderItemProps extends Sender {
  currentPage?: string;
  isSelected?: boolean;
}

const SenderItem: React.FC<SenderItemProps> = ({
  id,
  name,
  postsCount,
  isSelected,
  currentPage
}) => (
  <li key={ id } className={ cn('sender', { 'sender--selected': isSelected }) }>
    <Link className={ styles.sender__link } to={ isSelected ? `/posts/${ currentPage }` : id }>
      { `${ name } (${ postsCount })` }
    </Link>
  </li>
);

export default React.memo(SenderItem);
