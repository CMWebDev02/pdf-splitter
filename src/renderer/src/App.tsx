import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { EmbeddedPDF } from './components/embedded-pdf';
import PDFFileSelector from './components/pdf-file-selector';
import LabeledInput from './components/labeled-input';

// Plan for folder selector, start from user's folder and then allow them to 
// make an html "directory looking thing" and give links to every file. 

export function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [PDFURLsArray, setPDFURLsArray] = useState<string[]>([]);

  const [selectedPageArray, setSelectedPageArray] = useState<number[]>([]);

  const [pdfFile, setPDFFile] = useState<File | null>(null);

  const [newFileName, setNewFileName] = useState<string>('');

  const [saveFolderPath, setSaveFolderPath] = useState<string>('');

  useEffect(() => {
    async function checkSaveLocation() {
      const folderPath = await window.api.getSaveLocation();

      setSaveFolderPath(folderPath);
    }

    checkSaveLocation();
  }, []);

  async function changeSavePath() {
    const folders = await window.api.getDirectoryFolders("")

    console.log(folders)
  }

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
    if (selectedPageArray.length <= 0 || newFileName == '') return;

    if (pdfFile !== null) {
      const pdfFileArrayBuffer = await pdfFile.arrayBuffer();
      window.api.createNewPDF(selectedPageArray, saveFolderPath, newFileName, pdfFileArrayBuffer);
    }
  }

  return (
    <>
      <h1>PDF Splitter</h1>
      <h2>SaveFolder: {saveFolderPath}</h2>
      <button onClick={changeSavePath}>Change Folder</button>
      <PDFFileSelector labelText={'Choose PDF File:'} setFile={loadDisplayPDF} currentFile={pdfFile} />
      <h2>Selected Pages: {selectedPageArray}</h2>
      <LabeledInput setValue={setNewFileName} currentValue={newFileName} labelText='New File Name' />
      <button onClick={createNewPDF}>Split PDF</button>
      <hr />
      {PDFURLsArray.length !== 0 && PDFURLsArray.map((PDFURL, index) => <EmbeddedPDF key={`pdf-page-${index}`} pdfSRC={PDFURL} index={index} addPageToArray={addPageToArray} />)}
    </>
  );
}
