import type { ChangeEvent } from 'react';

import styles from './styles/pdf-file-selector.module.css';

interface PDFFileSelectorProps {
  labelText: string;
  setFile: (e: ChangeEvent<HTMLInputElement>) => void;
  currentFile: File | null;
}

export default function PDFFileSelector({ labelText, setFile, currentFile }: PDFFileSelectorProps) {
  return (
    <div className={styles.mainContainer}>
      <div>
        <h2>Selected File:</h2>
        <p>{currentFile !== null && currentFile?.name}</p>
      </div>
      <input type="file" id={`${labelText}-input`} onChange={setFile} accept="application/pdf" />
    </div>
  );
}
