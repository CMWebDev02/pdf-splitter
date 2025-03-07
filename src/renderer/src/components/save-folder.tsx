import { useState, type Dispatch } from 'react';
import DirectoryModal from './directory-modal';
import type { Dirent } from 'fs';

interface SaveFolderProps {
  saveFolderPath: string;
  setSaveFolderPath: Dispatch<string>;
  isModalShown: boolean;
  toggleModal: () => void;
}

export default function SaveFolder({ saveFolderPath, setSaveFolderPath, isModalShown, toggleModal }: SaveFolderProps) {
  const [directoryObjArray, setDirectoryObjArray] = useState<Dirent[]>([]);
  const [currentDirectoryPath, setCurrentDirectoryPath] = useState<string>('');

  function updateSaveFolderPath() {
    setSaveFolderPath(currentDirectoryPath);
    window.api.updateSaveLocation(currentDirectoryPath);
    toggleModal();
  }

  function displayDirectoryModal() {
    toggleModal();
    const userHomeDir = window.api.getUserHomeDir();
    getDirectories(userHomeDir);
  }

  async function getDirectories(directoryPath: string) {
    const folders = await window.api.getDirectoryFolders(directoryPath);

    setDirectoryObjArray(folders);
    setCurrentDirectoryPath(directoryPath);
  }

  function displayParentDirectory() {
    const parentDirectory = window.api.parentPath(currentDirectoryPath);
    getDirectories(parentDirectory);
  }

  return (
    <>
      <h2>SaveFolder: {saveFolderPath}</h2>
      <button onClick={displayDirectoryModal}>Change Folder</button>

      {isModalShown && <DirectoryModal directories={directoryObjArray} getDirectories={getDirectories} updateSaveFolderPath={updateSaveFolderPath} displayParentDirectory={displayParentDirectory} currentDirectoryPath={currentDirectoryPath} />}
    </>
  );
}
