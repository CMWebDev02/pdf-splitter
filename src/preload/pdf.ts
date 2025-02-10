import { PDFDocument } from 'pdf-lib';
import { readFile } from 'fs/promises';

export async function getPDFURL() {
  const initialPDF = await PDFDocument.load(await readFile('./resources/Temp.pdf'));
  // const initialPDFCount = initialPDF.getPageCount();

  const savedPage = await initialPDF.saveAsBase64()
  return savedPage;
}
