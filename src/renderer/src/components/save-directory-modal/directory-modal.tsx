import type { Dirent } from 'fs';
import DirectoryOption from './directory-option';

import styles from './styles/directory-modal.module.css';
import { DriveSelector } from './drive-selector';

interface DirectoryModalProps {
  directories: Dirent[];
  getDirectories: (directoryPaths: string) => void;
  updateSaveFolderPath: () => void;
  displayParentDirectory: () => void;
  currentDirectoryPath: string;
  drivesList: string[];
  toggleModal: () => void;
}

export default function DirectoryModal({ directories, getDirectories, updateSaveFolderPath, displayParentDirectory, currentDirectoryPath, drivesList, toggleModal }: DirectoryModalProps) {

  const RenderDirectories = () => {
    return directories.length > 0 ? (
      directories.map((dirObj) => {
        return <DirectoryOption key={`${dirObj.name}-dir-option`} directoryName={dirObj.name} directoryPath={dirObj.parentPath} getDirectories={getDirectories} />;
      })
    ) : (
      <h2>No Directories To Display</h2>
    );
  };

  return (
    <div className={styles.directoryModal}>
      <div className={styles.modalHeader}>
        <h2>{currentDirectoryPath}</h2>
        <button className='interfaceButton' onClick={toggleModal}>X</button>
      </div>
      <div className={styles.directoryOptionsDiv}>
        <RenderDirectories />
      </div>
      <div className={styles.modalFooter}>
        <button onClick={updateSaveFolderPath} className="interfaceButton">
          Save
        </button>
        <DriveSelector drivesList={drivesList} getDirectories={getDirectories} />
        <button onClick={displayParentDirectory} className="interfaceButton">
          Return
        </button>
      </div>
    </div>
  );
}
