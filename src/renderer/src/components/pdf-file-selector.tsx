import type { ChangeEvent } from 'react';

interface PDFFileSelectorProps {
  labelText: string;
  setFile: (e: ChangeEvent<HTMLInputElement>) => void;
  currentFile: File | null;
}

export default function PDFFileSelector({ labelText, setFile, currentFile }: PDFFileSelectorProps) {

  return (
    <div>
      <label htmlFor={`${labelText}-input`}>{labelText}</label>
      <input type="file" id={`${labelText}-input`} onChange={setFile} accept="application/pdf" />
      {currentFile !== null && <h2>{currentFile?.name}</h2>}
    </div>
  );
}
