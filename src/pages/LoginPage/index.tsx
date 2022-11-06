import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useAppDispatch } from 'store';
import { logIn } from 'store/slices/auth';
import useAuth from 'hooks/useAuth';
import Loader from 'components/Loader';

import LoginForm from './LoginForm';

import styles from './LoginPage.module.scss';

const cn = classNames.bind(styles);

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { clientId, isLoggingIn } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');

  const canSignIn = Boolean(email && name);

  const handleEmailChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value); },
    []
  );

  const handleNameChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value); },
    []
  );

  const handleSignIn = useCallback(
    (): void => {
      dispatch(logIn({ name, email }));
    },
    [dispatch, email, name]
  );

  if (clientId) {
    return <Navigate to="/posts" />;
  }

  return (
    <div className={ cn(styles.container, { 'container--loading': isLoggingIn }) }>
      { isLoggingIn
        ? <Loader />
        : (
          <LoginForm
            canSignIn={ canSignIn }
            onNameChanged={ handleNameChanged }
            onEmailChanged={ handleEmailChanged }
            onSignInClicked={ handleSignIn }
          />
        ) }
    </div>
  );
};

export default React.memo(LoginPage);
