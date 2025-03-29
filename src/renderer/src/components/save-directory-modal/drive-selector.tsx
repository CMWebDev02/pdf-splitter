import type { ChangeEvent } from 'react';

interface DriveSelectorProps {
  drivesList: string[];
  getDirectories: (directoryPaths: string) => void;
}

export function DriveSelector({ drivesList, getDirectories }: DriveSelectorProps) {
  function setDrivePath(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value !== 'N/A') {
      const drivePath = e.target.value;
      getDirectories(`${drivePath}\\`);
    }
  }

  return (
    <select onChange={setDrivePath}>
      <option value={'N/A'}>Select Drive</option>
      {drivesList.length > 0 && drivesList.map((drive) => <option key={drive}>{drive}</option>)}
    </select>
  );
}
