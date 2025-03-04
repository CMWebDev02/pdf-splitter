import fs from 'fs/promises';
import os from 'os';
import path from 'path';

const userHomeDir = os.homedir();

type SaveFileData = {
  "save-location": string;
}

const saveFileLocation = path.join(userHomeDir, 'pdf-splitter', 'save-location.json');

const initialSaveFileData = {
  'save-location': ''
};

async function validateSaveLocationFile() {
  try {
    await fs.readFile(saveFileLocation);
    return true;
  } catch (error) {
    return false;
  }
}

async function validateDirectory(dirPath: string) {
  try {
    await fs.opendir(dirPath);
    return true;
  } catch (error) {
    return false;
  }
}

export async function initializeSaveLocationFile() {
  try {
    const directoryPath = path.dirname(saveFileLocation);
    const doesDirExist = await validateDirectory(directoryPath);
    if (!doesDirExist) await fs.mkdir(directoryPath);
    await fs.writeFile(saveFileLocation, JSON.stringify(initialSaveFileData));
  } catch (error) {
    console.error(error);
  }
}

async function checkSaveLocationFile() {
  try {
    const isFilePresent = await validateSaveLocationFile();

    // If the file is not present then 5 attempts are made to create the file.
    if (!isFilePresent) {
      let attemptNumber = 0;
      let isFileCreated = false;

      while (attemptNumber < 5 && !isFileCreated) {
        await initializeSaveLocationFile();

        isFileCreated = await validateSaveLocationFile();
        attemptNumber++;
      }

      return isFileCreated;
    }

    return isFilePresent;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getSaveFolderLocation() {
  try {
    const doesFileExist = await checkSaveLocationFile();

    if (!doesFileExist) return "";

    const saveFileData = await fs.readFile(saveFileLocation, 'utf-8');
    const saveFileJSON: SaveFileData = JSON.parse(saveFileData);

    return saveFileJSON["save-location"];
  } catch (error) {
    console.error(error);
    return "";
  }
}
