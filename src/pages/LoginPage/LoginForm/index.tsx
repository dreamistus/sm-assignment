import React from 'react';
import Button from 'components/Button';
import LabeledInput from 'components/LabeledInput';

import styles from './LoginForm.module.scss';

interface LoginFormProps {
  canSignIn?: boolean;
  onNameChanged: React.ChangeEventHandler<HTMLInputElement>;
  onEmailChanged: React.ChangeEventHandler<HTMLInputElement>;
  onSignInClicked: VoidFunction;
}

const LoginForm: React.FC<LoginFormProps> = ({
  canSignIn,
  onNameChanged,
  onEmailChanged,
  onSignInClicked
}) => (
  <form className={ styles.form } onSubmit={ (event): void => event.preventDefault() }>
    <LabeledInput
      id="name"
      label="Name"
      aria-label="Name"
      type="text"
      autoComplete="name"
      onChange={ onNameChanged }
    />
    <LabeledInput
      id="email"
      label="Email"
      aria-label="Email"
      type="email"
      autoComplete="email"
      onChange={ onEmailChanged }
    />
    <Button
      type="button"
      text="Sign in"
      disabled={ !canSignIn }
      onClick={ onSignInClicked }
    />
  </form>
);

export default React.memo(LoginForm);
