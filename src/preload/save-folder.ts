import { writeFile } from "fs";
import { readFile } from "fs/promises"

async function validateSaveLocationFile() {
    try {
        await readFile("./resources/save-location.json");        
        return true;
    } catch (error) {
        return false;
    }
}

export async function initializeSaveLocationFile() {
    try {
        await writeFile()
    } catch (error) {
        
    }
}

export async function checkSaveLocationFile() {
    const isFilePresent = await validateSaveLocationFile();

    if (!isFilePresent) await initializeSaveLocationFile();
}
