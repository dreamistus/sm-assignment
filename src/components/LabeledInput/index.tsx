/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Input, { InputProps } from 'components/Input';

import styles from './LabeledInput.module.scss';

interface LabeledInputProps extends Omit<InputProps, 'id'> {
  id: string;
  label: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({ id, label, ...rest }) => (
  <label className={ styles.label } htmlFor={ id }>
    <span className={ styles.label__text }>{ label }</span>
    <Input id={ id } ariaLabel={ label } { ...rest } />
  </label>
);

export default React.memo(LabeledInput);
