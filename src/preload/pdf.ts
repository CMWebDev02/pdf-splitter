import pdfLib from 'pdf-lib';
const { PDFDocument } = pdfLib;
import fs from 'fs/promises';
import path from 'path';

export async function getPDFURIs(pdfFile: ArrayBuffer) {
  try {
    const initialPDF = await PDFDocument.load(pdfFile);
    const initialPDFPageCount = initialPDF.getPageCount();

    const savedPages: string[] = [];

    // Iterates until the pdf's page count it reached.
    for (let index = 0; index < initialPDFPageCount; index++) {
      // Initializes a new pdf document.
      const newPDF = await PDFDocument.create();
      // Copies initialPDF page associated with the current index and destructure the array to receive the singular page.
      //! Only one page is being retrieved at a time so destructuring will not cause any issues.
      const [pageToSave] = await newPDF.copyPages(initialPDF, [index]);
      // Inserts the now copied page into the newly created pdf document.
      newPDF.insertPage(0, pageToSave);
      // Pushed the new singular pdf page to the savedPages array.
      savedPages.push(await newPDF.saveAsBase64({ dataUri: true }));
    }

    // Returns the array of separately saved pdf pages.
    return savedPages;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function checkPath(path: string) {
  try {
    //* Attempts to check the user's permissions for a file or directory, and if it can read the permissions from said file or directory it exists.
    await fs.access(path);
    return true;
  } catch (error) {
    //* If an error occurs due to the path not leading to any file or directory, then the file does not exist.
    return false;
  }
}

async function validateFileName(saveFolderPath: string, newFileName: string) {
  try {
    //? Concatenates the new path for the invoice.
    let newPDFFilePath = `${saveFolderPath}/${newFileName}`;

    const doesFileExist = await checkPath(newPDFFilePath);

    //? Checks that said path does not already exists, and if not, the new path string is returned.
    if (!doesFileExist) return `${newFileName}`;

    //* Creates the regex pattern for find the copy indicator for a file.
    let copyPattern = /\((\d+)\)/; // Searches for () and captures the numbers between them.

    do {
      //? If the file name already exists, appends the copy number to the end and ".pdf".
      if (!copyPattern.test(newFileName)) {
        newFileName = `${newFileName.substring(0, newFileName.lastIndexOf('.'))} (2).pdf`;
      } else {
        //? If the copy pattern is already appended to the file, then increment its count by one.
        newFileName = newFileName.replace(copyPattern, (_, copyNumber) => `(${parseInt(copyNumber) + 1})`);
      }
      //? Concatenates the new path.
      newPDFFilePath = `${saveFolderPath}/${newFileName}`;
      //* Runs the while loop so long as the new path string already points to a file.
    } while (await checkPath(newPDFFilePath));
    //? Once the while loop stops running, the new path string should be unique and can be returned to allow the storing of said invoice without overwriting another one.
    return `${newFileName}`;
  } catch (error) {
    console.log(error);
    return '';
  }
}

export async function createNewPDF(selectedPages: number[], saveFolderPath: string, newFileName: string, pdfFile: ArrayBuffer) {
  try {
    // Reads the initial pdf file and initializes a new file.
    const initialPDF = await PDFDocument.load(pdfFile);
    const newPDF = await PDFDocument.create();

    // Copies the selected pages from the initial pdf file to the new pdf file and adds them to the new pdf file.
    const pagesToCopy = await newPDF.copyPages(initialPDF, selectedPages);
    pagesToCopy.forEach((copiedPage) => newPDF.addPage(copiedPage));

    // Saves the new pdf file as an array buffer and writes the data to the file path created using the passed in savedFolderPath and newFileName variables.
    const savedPDFFile = await newPDF.save();
    const finalFileName = await validateFileName(saveFolderPath, `${newFileName}.pdf`);
    if (finalFileName === '') throw new Error('File name invalid.');
    await fs.writeFile(path.join(saveFolderPath, `${finalFileName}`), savedPDFFile);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
