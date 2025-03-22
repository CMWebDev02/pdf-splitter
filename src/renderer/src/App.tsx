import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { EmbeddedPDF } from './components/pdf-display/embedded-pdf';
import PDFFileSelector from './components/user-controls/pdf-file-selector';
import LabeledInput from './components/user-controls/labeled-input';
import SaveFolder from './components/save-directory-modal/save-folder';

import './styles.css';

import styles from './styles/main-styles.module.css';
import PageSelectionDisplay from './components/user-controls/page-selection-display';
import { ViewCheckBox } from './components/user-controls/view-checkbox';
import { PDFDisplayContainer } from './components/pdf-display/pdf-display-container';

export function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [PDFURLsArray, setPDFURLsArray] = useState<string[]>([]);

  const [hiddenPages, setHiddenPages] = useState<number[]>([]);

  const [selectedPageArray, setSelectedPageArray] = useState<number[]>([]);

  const [pdfFile, setPDFFile] = useState<File | null>(null);

  const [newFileName, setNewFileName] = useState<string>('');

  const [saveFolderPath, setSaveFolderPath] = useState<string>('');

  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const [isViewTwoPages, setIsViewTwoPages] = useState<boolean>(false);

  function toggleModal() {
    setIsModalShown(!isModalShown);
  }

  useEffect(() => {
    async function checkSaveLocation() {
      const folderPath = await window.api.getSaveLocation();

      setSaveFolderPath(folderPath);
    }

    checkSaveLocation();
  }, []);

  async function loadDisplayPDF(e: ChangeEvent<HTMLInputElement>) {
    if (e.target !== null && e.target?.files !== null) {
      setPDFFile(e.target.files[0]);

      const pdfArrayBuffer = await e.target.files[0].arrayBuffer();
      const pdfURIs = await window.api.splitPDF(pdfArrayBuffer);

      setPDFURLsArray(pdfURIs);
      setSelectedPageArray([]);
      setHiddenPages([]);
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
      const isFileCreated = window.api.createNewPDF(selectedPageArray, saveFolderPath, newFileName, pdfFileArrayBuffer);
      setHiddenPages((prevArray) => {
        let newArray: number[] = [...prevArray];
        for (const page of selectedPageArray) {
          if (!prevArray.includes(page)) {
            newArray.push(page);
          }
        }
        return newArray.sort((a, b) => a - b);
      });
      setSelectedPageArray([]);

      if (isFileCreated) alert('File Created');
    }
  }

  function showHiddenPages() {
    const userChoice = confirm('Show all hidden pages?');

    if (userChoice) setHiddenPages([]);
  }

  return (
    <>
      <header className={styles.headerContainer}>
        <h1>PDF Splitter</h1>
        <div className={styles.innerHeaderContainer}>
          <ViewCheckBox alterView={setIsViewTwoPages} />
          <SaveFolder setSaveFolderPath={setSaveFolderPath} saveFolderPath={saveFolderPath} isModalShown={isModalShown} toggleModal={toggleModal} />
        </div>
      </header>
      <main className={styles.mainContainer}>
        <div className={styles.userControlsContainer}>
          <div>
            <PDFFileSelector labelText={'Choose PDF File:'} setFile={loadDisplayPDF} currentFile={pdfFile} />
            <PageSelectionDisplay selectedPageArray={selectedPageArray} />
            <button className="interfaceButton" onClick={showHiddenPages}>
              Show Hidden Pages
            </button>
          </div>
          <div>
            <LabeledInput setValue={setNewFileName} currentValue={newFileName} labelText="File Name" />
            <button onClick={createNewPDF} className="interfaceButton">
              Split PDF
            </button>
          </div>
        </div>
        <PDFDisplayContainer PDFURLsArray={PDFURLsArray} isViewTwoPages={isViewTwoPages} addPageToArray={addPageToArray} hiddenPagesArray={hiddenPages} />
      </main>
    </>
  );
}
