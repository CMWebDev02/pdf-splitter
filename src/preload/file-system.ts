// import path from 'path';
import os from 'os';
import fs from 'fs/promises';

const userHomeDir = os.homedir();

export async function getFolders(dirPath: string) {
  if (dirPath === '') {
    dirPath = userHomeDir;
  }

  const allFolders = await fs.readdir(dirPath, { withFileTypes: true});

  return allFolders.filter(item => item.isDirectory() && item.name[0] !== ".");
}
