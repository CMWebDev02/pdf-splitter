const { PDFDocument } = window.require('pdf-lib');
const { readFile } = window.require('fs/promises');

async function splitPDF() {
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

function decodePDFIntoBlob(fileString: string) {
  //? The atob method decodes the base64 string back to raw binary.
  const fileBinary = atob(fileString);
  //* A new array is constructed to create an array buffer.
  const arrayBuffer = new Uint8Array(fileBinary.length);

  //? The binary is iterated through and the associated index in the array buffer converts the binary value to an equivalent Unicode value.
  for (let index = 0; index < fileBinary.length; index++) {
    arrayBuffer[index] = fileBinary.charCodeAt(index);
  }

  //? Constructs a blob out of the array buffer created from the buffer array.
  let pdfBlob = new Blob([arrayBuffer], { type: "application/pdf" });

  //? Returns a objectUrl that points towards the pdfBlob.
  return URL.createObjectURL(pdfBlob);
}

export async function getPDFURLs() {
    const pdfPagesArray = await splitPDF();
    const pdfURLSArray = pdfPagesArray.map(PDF => decodePDFIntoBlob(PDF));
    return pdfURLSArray;
}
