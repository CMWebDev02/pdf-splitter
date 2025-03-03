import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { EmbeddedPDF } from './components/embedded-pdf';
import PDFFileSelector from './components/pdf-file-selector';

export function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [PDFURLsArray, setPDFURLsArray] = useState<string[]>([]);

  const [selectedPageArray, setSelectedPageArray] = useState<number[]>([]);

  const [pdfFile, setPDFFile] = useState<File | null>(null);

  async function loadDisplayPDF(e: ChangeEvent<HTMLInputElement>) {
    if (e.target !== null && e.target?.files !== null) {
      setPDFFile(e.target.files[0]);

      const pdfArrayBuffer = await e.target.files[0].arrayBuffer();
      const pdfURIs = await window.api.splitPDF(pdfArrayBuffer);

      setPDFURLsArray(pdfURIs);
    }
  }

  function addPageToArray(page: number) {
    setSelectedPageArray((prevPages) => {
      let newPageArray: number[] = [];
      if (prevPages.includes(page)) {
        newPageArray = [...prevPages].filter((currentPage) => currentPage !== page);
      } else {
        newPageArray = [...prevPages, page];
      }
      return newPageArray.sort((a, b) => a - b);
    });
  }

  async function createNewPDF() {
    if (selectedPageArray.length <= 0) return;

    await window.api.createNewPDF(selectedPageArray);
  }

  return (
    <>
      <h1>{selectedPageArray}</h1>
      <PDFFileSelector labelText={'Choose PDF File:'} setFile={loadDisplayPDF} currentFile={pdfFile} />
      {PDFURLsArray.length !== 0 && PDFURLsArray.map((PDFURL, index) => <EmbeddedPDF key={`pdf-page-${index}`} pdfSRC={PDFURL} index={index} addPageToArray={addPageToArray} />)}
      <button onClick={createNewPDF}>Split PDF</button>
    </>
  );
}
