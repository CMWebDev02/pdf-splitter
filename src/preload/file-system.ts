import fs from 'fs/promises';

export async function getFolders(dirPath: string) {
  const allFolders = await fs.readdir(dirPath, { withFileTypes: true });

  return allFolders.filter((item) => item.isDirectory() && item.name[0] !== '.');
}
