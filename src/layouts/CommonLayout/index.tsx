import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './CommonLayout.module.scss';

const CommonLayout: React.FC = () => (
  <div className={ styles.container }>
    <Outlet />
  </div>
);

export default React.memo(CommonLayout);
