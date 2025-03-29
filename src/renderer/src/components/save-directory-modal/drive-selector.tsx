import type { ChangeEvent } from "react";

interface DriveSelectorProps {
    drivesList: string[];
    getDirectories: (directoryPaths: string) => void;
}

export function DriveSelector({drivesList, getDirectories}: DriveSelectorProps) {
    function setDrivePath(e: ChangeEvent<HTMLSelectElement>) {
        if(e.target.value !== "N/A") {
            getDirectories(e.target.value);
        }
    }

    return (
        <select onChange={setDrivePath}>
            <option value={"N/A"}>Select Drive</option>
            {drivesList.length > 0 && drivesList.map(drive => <option>{drive}</option>)}
        </select>
    )
}