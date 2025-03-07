interface DirectoryOptionProps {
  directoryName: string;
  directoryPath: string;
  getDirectories: (directoryPath: string) => void;
}

export default function DirectoryOption({ directoryName, directoryPath, getDirectories }: DirectoryOptionProps) {
  function updateCurrentDisplayDirectory() {
    const newDirectory = window.api.joinPaths([directoryPath, directoryName]);
    getDirectories(newDirectory);
  }

  return (
    <div>
      <p>{directoryName}</p>
      <button onClick={updateCurrentDisplayDirectory}>{'->'}</button>
    </div>
  );
}
