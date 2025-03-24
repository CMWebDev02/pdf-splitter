import { useEffect, useRef, type ChangeEvent, type Dispatch, type KeyboardEvent } from 'react';

import styles from './styles/labeled-input.module.css';

interface LabeledInputProps {
  setValue: Dispatch<string>;
  currentValue: string;
  labelText: string;
  triggerFileCreation: () => void;
}

export default function LabeledInput({ setValue, currentValue, labelText, triggerFileCreation }: LabeledInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
      function activateShortCut(e: KeyboardEventInit) {
        if (e.key === "t" && e.altKey) {
          gainFocus();
        } else if (e.key === "Enter") {
          triggerFileCreation();
        } else if (e.key === "Escape") {
          loseFocus();
        }
      }
  
      addEventListener('keydown', activateShortCut);
  
      return () => {
        removeEventListener('keydown', activateShortCut);
      };
    }, []);

  function gainFocus() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function loseFocus() {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={`${labelText}-input`}>{labelText}:</label>
      <input type="text" id={`${labelText}-input`} onChange={handleChange} value={currentValue} className="interfaceInput" ref={inputRef} />
    </div>
  );
}
