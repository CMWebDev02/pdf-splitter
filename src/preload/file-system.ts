import fs from 'fs/promises';
import os from 'os';

const userHomeDir = os.homedir();

export async function getFolders(dirPath: string) {
  const allFolders = await fs.readdir(dirPath, { withFileTypes: true });

  return allFolders.filter((item) => item.isDirectory() && item.name[0] !== '.');
}

export function getHomeDir() {
  return userHomeDir;
}
