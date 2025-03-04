import type { ChangeEvent } from 'react';

interface PDFFileSelectorProps {
  labelText: string;
  setFile: (e: ChangeEvent<HTMLInputElement>) => void;
  currentFile: File | null;
}

export default function PDFFileSelector({ labelText, setFile, currentFile }: PDFFileSelectorProps) {

  return (
    <div>
      <h2>Selected PDF File: {currentFile !== null && currentFile?.name}</h2>
      <input type="file" id={`${labelText}-input`} onChange={setFile} accept="application/pdf" />
    </div>
  );
}
