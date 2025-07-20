import fs from 'fs/promises';
import os from 'os';
import { getDiskInfo } from 'node-disk-info';

const userHomeDir = os.homedir();

export async function getFolders(dirPath: string) {
  const allFolders = await fs.readdir(dirPath, { withFileTypes: true });

  return allFolders.filter((item) => item.isDirectory() && item.name[0] !== '.' && item.name.toLocaleLowerCase() !== `\$RECYCLE.BIN`.toLocaleLowerCase() && item.name.toLocaleLowerCase() !== 'System Volume Information'.toLocaleLowerCase());
}

export function getHomeDir() {
  return userHomeDir;
}

export async function getAllDrives() {
  try {
    const allDrives = await getDiskInfo();
    return allDrives.map((drive) => drive.mounted);
  } catch (error) {
    console.log(error);
    return [];
  }
}
