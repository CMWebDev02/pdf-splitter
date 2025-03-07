import type { ChangeEvent, Dispatch } from 'react';

import styles from './styles/labeled-input.module.css';

interface LabeledInputProps {
  setValue: Dispatch<string>;
  currentValue: string;
  labelText: string;
}

export default function LabeledInput({ setValue, currentValue, labelText }: LabeledInputProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={`${labelText}-input`}>{labelText}:</label>
      <input type="text" id={`${labelText}-input`} onChange={handleChange} value={currentValue} className="interfaceInput" />
    </div>
  );
}
