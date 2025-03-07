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

export function parentPath(pathString: string) {
  if (pathString === '' || pathString === userHomeDir) return userHomeDir;
  return path.dirname(pathString);
}
