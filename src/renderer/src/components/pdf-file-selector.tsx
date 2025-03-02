import type { ChangeEvent, Dispatch } from 'react';

interface PDFFileSelectorProps {
  labelText: string;
  setFile: Dispatch<File>;
  currentFile: File | null;
}

export default function PDFFileSelector({ labelText, setFile, currentFile }: PDFFileSelectorProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target !== null && e.target?.files !== null) {
      setFile(e.target.files[0]);
    }
  }

  return (
    <div>
      <label htmlFor={`${labelText}-input`}>{labelText}</label>
      <input type="file" id={`${labelText}-input`} onChange={handleChange} accept="application/pdf" />
      {currentFile !== null && <h2>{currentFile?.name}</h2>}
    </div>
  );
}
