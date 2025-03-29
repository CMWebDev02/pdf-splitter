import { useEffect, useState, type Dispatch } from 'react';
import DirectoryModal from './directory-modal';
import type { Dirent } from 'fs';

import styles from './styles/save-folder.module.css';

interface SaveFolderProps {
  saveFolderPath: string;
  setSaveFolderPath: Dispatch<string>;
  isModalShown: boolean;
  toggleModal: () => void;
}

export default function SaveFolder({ saveFolderPath, setSaveFolderPath, isModalShown, toggleModal }: SaveFolderProps) {
  const [directoryObjArray, setDirectoryObjArray] = useState<Dirent[]>([]);
  const [currentDirectoryPath, setCurrentDirectoryPath] = useState<string>('');
  const [drivesList, setDrivesList] = useState<string[]>([]);

  useEffect(() => {
    async function getDrives() {
      const drives = await window.api.getAllDrives();
      setDrivesList(drives);
    }

    getDrives();
  }, []);

  function updateSaveFolderPath() {
    if (currentDirectoryPath !== '') {
      setSaveFolderPath(currentDirectoryPath);
      toggleModal();
    }
  }

  function displayDirectoryModal() {
    toggleModal();
    setCurrentDirectoryPath('');
    setDirectoryObjArray([]);
  }

  async function getDirectories(directoryPath: string) {
    const folders = await window.api.getDirectoryFolders(directoryPath);

    setDirectoryObjArray(folders);
    setCurrentDirectoryPath(directoryPath);
  }

  function displayParentDirectory() {
    if (drivesList.length < 0) return;
    const parentDirectory = window.api.parentPathString(currentDirectoryPath, drivesList);
    getDirectories(parentDirectory);
  }

  return (
    <>
      <div className={styles.saveFolderDisplayDiv}>
        <h2 onClick={displayDirectoryModal}>SaveFolder:</h2>
        <p>{saveFolderPath}</p>
      </div>

      {isModalShown && <DirectoryModal directories={directoryObjArray} getDirectories={getDirectories} updateSaveFolderPath={updateSaveFolderPath} displayParentDirectory={displayParentDirectory} currentDirectoryPath={currentDirectoryPath} drivesList={drivesList} toggleModal={toggleModal} />}
    </>
  );
}
