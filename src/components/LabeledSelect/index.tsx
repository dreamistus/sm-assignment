import React from 'react';

import styles from './Select.module.scss';

interface LabeledSelectProps {
  id: string;
  label: string;
  options: string[] | number[];
  selected: string | number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const LabeledSelect: React.FC<LabeledSelectProps> = ({
  id,
  label,
  options,
  selected,
  onChange
}) => (
  <label className={ styles.wrapper } htmlFor={ id }>
    { label }
    <select
      className={ styles.wrapper__select }
      id={ id }
      onChange={ onChange }
      value={ selected }
    >
      { options.map(option => (<option key={ option } value={ option }>{ option }</option>)) }
    </select>
  </label>
);

export default React.memo(LabeledSelect);
