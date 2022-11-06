import { useAppDispatch } from 'store';
import useAuth from 'hooks/useAuth';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Button from 'components/Button';
import { logOut } from 'store/slices/auth';

import styles from './ProtectedRouteLayout.module.scss';

const ProtectedRoute: React.FC = () => {
  const { clientId, email } = useAuth();
  const dispatch = useAppDispatch();
  const handleLogOut = (): void => { dispatch(logOut()); };

  return clientId
    ? (
      <>
        <header className={ styles.header }>
          <div className={ styles.header__user }>{ email }</div>
          <nav>
            <Button text="Sign out" type="button" onClick={ handleLogOut } />
          </nav>
        </header>
        <Outlet />
      </>
    )
    : <Navigate to="/login" />;
};

export default React.memo(ProtectedRoute);
