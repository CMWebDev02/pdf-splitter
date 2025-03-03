import pdfLib from 'pdf-lib';
const { PDFDocument } = pdfLib;
import { readFile, writeFile } from 'fs/promises';

export async function getPDFURIs(pdfFile: ArrayBuffer) {
  const initialPDF = await PDFDocument.load(pdfFile);
  const initialPDFPageCount = initialPDF.getPageCount();

  console;

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
}

export async function createNewPDF(selectedPages: number[]) {
  const initialPDF = await PDFDocument.load(await readFile('./resources/Temp.pdf'));
  const newPDF = await PDFDocument.create();

  const pagesToCopy = await newPDF.copyPages(initialPDF, selectedPages);
  pagesToCopy.forEach((copiedPage) => newPDF.addPage(copiedPage));

  const savedPDFFile = await newPDF.save();

  await writeFile('./resources/newPDF.pdf', savedPDFFile);
}
