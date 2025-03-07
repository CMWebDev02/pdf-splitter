import type { Dirent } from 'fs';
import DirectoryOption from './directory-option';

import styles from './styles/directory-modal.module.css';

interface DirectoryModalProps {
  directories: Dirent[];
  getDirectories: (directoryPaths: string) => void;
  updateSaveFolderPath: () => void;
  displayParentDirectory: () => void;
  currentDirectoryPath: string;
}

export default function DirectoryModal({ directories, getDirectories, updateSaveFolderPath, displayParentDirectory, currentDirectoryPath }: DirectoryModalProps) {
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
        <button onClick={updateSaveFolderPath} className="interfaceButton">
          Save
        </button>
        <h2>{currentDirectoryPath}</h2>
        <button onClick={displayParentDirectory} className="interfaceButton">
          Return
        </button>
      </div>
      <div className={styles.directoryOptionsDiv}>
        <RenderDirectories />
      </div>
    </div>
  );
}
