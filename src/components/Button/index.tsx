/* eslint-disable react/button-has-type */
import React from 'react';

import styles from './Button.module.scss';

interface ButtonProps {
  /** Button text */
  text: string;

  /** Button type */
  type: 'submit' | 'reset' | 'button';

  /** Button disabled state */
  disabled?: boolean;

  /** Fires when user clicks the button */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type,
  disabled,
  onClick
}) => (
  <button
    className={ styles.button }
    type={ type }
    disabled={ disabled }
    onClick={ onClick }
    tabIndex={ 0 }
  >
    { text }
  </button>
);

export default React.memo(Button);
