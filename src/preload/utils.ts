import path from 'path';
import os from 'os';

const userHomeDir = os.homedir();

export function getUserHomeDir() {
  return os.homedir();
}

export function joinPaths(pathArr: string[]) {
  let finalPath = '';

  for (const string of pathArr) {
    finalPath = path.join(finalPath, string);
  }

  return finalPath;
}

export function parentPathString(pathString: string, driveList: string[]) {
  // Prevents the user from accessing parent elements if the path string is an empty string.
  // Or if the string is the root of the drive return the same drive path.
  if (pathString === '') return userHomeDir;
  for (const drive of driveList) {
    if (pathString === drive) return drive;
  }
  return path.dirname(pathString);
}
