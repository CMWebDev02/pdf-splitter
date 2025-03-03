import type { Dispatch } from 'react';

interface PDFFileSelectorProps {
  setFolderPath: Dispatch<string>;
  currentFolderPath: string;
}

export default function SavePathSetter({ setFolderPath, currentFolderPath }: PDFFileSelectorProps) {
  async function showFolderPicker() {
    try {
      const selectedDirPath: FileSystemDirectoryHandle = await window.showDirectoryPicker();
      
      
    } catch (error: unknown) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2>Save Location: {currentFolderPath !== '' && currentFolderPath}</h2>
      <button onClick={showFolderPicker}>Change</button>
    </div>
  );
}
