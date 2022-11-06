import React from 'react';
import classNames from 'classnames/bind';

import styles from './Input.module.scss';

const cn = classNames.bind(styles);

export interface InputProps {
  id?: string;
  ariaLabel?: string;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: string;
  placeholder?: string;
  stretch?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  id,
  ariaLabel,
  type,
  autoComplete,
  placeholder,
  stretch,
  onChange
}) => (
  <input
    className={ cn('input', { 'input--stretch': stretch }) }
    id={ id }
    type={ type }
    autoComplete={ autoComplete }
    aria-label={ ariaLabel }
    tabIndex={ 0 }
    placeholder={ placeholder }
    onChange={ onChange }
  />
);

export default React.memo(Input);
