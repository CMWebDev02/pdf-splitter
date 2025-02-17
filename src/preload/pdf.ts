import { PDFDocument } from 'pdf-lib';
import { readFile } from 'fs/promises';

export async function splitPDF() {
  const initialPDF = await PDFDocument.load(await readFile('./resources/Temp.pdf'));
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
    savedPages.push(await newPDF.saveAsBase64());
  }

  // Returns the array of separately saved pdf pages.
  return savedPages;
}
