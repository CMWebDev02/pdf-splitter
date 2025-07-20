import type { ChangeEvent, Dispatch } from 'react';
import styles from './styles/view-checkbox.module.css';

interface ViewCheckBoxProps {
  alterValue: Dispatch<boolean>;
  labelText: string;
}

export function LabeledCheckBox({ alterValue, labelText }: ViewCheckBoxProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    alterValue(e.target.checked);
  }

  return (
    <div className={styles.mainDiv}>
      <label htmlFor={`${labelText}-checkbox`}>{labelText}</label>
      <input type="checkbox" onChange={handleChange} id={`${labelText}-checkbox`} />
    </div>
  );
}
