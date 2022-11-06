import styles from './SortDirectionPicker.module.scss';

interface SortDirectionPickerProps {
  isDescending: boolean;
  onToggle: VoidFunction;
}

const SortDirectionPicker: React.FC<SortDirectionPickerProps> = ({ isDescending, onToggle }) => (
  <div className={ styles.picker }>
    <button
      className={ styles.picker__button_asc }
      type="button"
      aria-label="Sort ascending"
      disabled={ !isDescending }
      onClick={ onToggle }
    />
    <button
      className={ styles.picker__button_dsc }
      type="button"
      aria-label="Sort descending"
      disabled={ isDescending }
      onClick={ onToggle }
    />
  </div>
);

export default SortDirectionPicker;
