interface DirectoryOptionProps {
  directoryName: string;
  directoryPath: string;
  getDirectories: (directoryPath: string) => void;
}

import styles from './styles/directory-options.module.css';

export default function DirectoryOption({ directoryName, directoryPath, getDirectories }: DirectoryOptionProps) {
  function updateCurrentDisplayDirectory() {
    const newDirectory = window.api.joinPaths([directoryPath, directoryName]);
    getDirectories(newDirectory);
  }

  return (
    <div className={styles.directoryOptionDiv}>
      <p>{directoryName}</p>
      <button onClick={updateCurrentDisplayDirectory} className="interfaceButton">
        {'->'}
      </button>
    </div>
  );
}
