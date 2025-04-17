import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import PDFFileSelector from './components/user-controls/pdf-file-selector';
import LabeledInput from './components/user-controls/labeled-input';
import SaveFolder from './components/save-directory-modal/save-folder';

import './styles.css';

import styles from './styles/main-styles.module.css';
import PageSelectionDisplay from './components/user-controls/page-selection-display';
import { LabeledCheckBox } from './components/user-controls/labeled-checkbox';
import { PDFDisplayContainer } from './components/pdf-display/pdf-display-container';
import { SaveFolderLocation } from './utils/local-storage';
import { PopUpContainer } from './components/pop-ups/pop-up-container';
import { PopUpObject } from './utils/types';

export function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [PDFURLsArray, setPDFURLsArray] = useState<string[]>([]);

  const [hiddenPages, setHiddenPages] = useState<number[]>([]);

  const [selectedPageArray, setSelectedPageArray] = useState<number[]>([]);

  const [pdfFile, setPDFFile] = useState<File | null>(null);

  const [newFileName, setNewFileName] = useState<string>('');

  const [saveFolderPath, setSaveFolderPath] = useState<string>(SaveFolderLocation.retrieveValue());

  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const [isViewTwoPages, setIsViewTwoPages] = useState<boolean>(false);

  const [arePagesHidden, setArePagesHidden] = useState<boolean>(false);

  const [currentPopUps, setCurrentPopUps] = useState<PopUpObject[]>([]);

  const pdfDisplayDivRef = useRef<HTMLDivElement | null>(null);

  function toggleModal() {
    setIsModalShown(!isModalShown);
  }

  useEffect(() => {
    SaveFolderLocation.setValue(saveFolderPath);
  }, [saveFolderPath]);

  useEffect(() => {
    if (currentPopUps.length > 0) {
      setCurrentPopUps([]);
    }
  }, [pdfFile, saveFolderPath]);

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

  function checkForFileCreation() {
    let errorMessage = '';
    if (pdfFile === null) {
      errorMessage = 'First Select a Valid PDF File!';
    } else if (selectedPageArray.length <= 0) {
      errorMessage = 'Select A Page First!';
    } else if (newFileName == '') {
      errorMessage = 'Enter A Valid File Name!';
    }

    if (errorMessage !== '') {
      setCurrentPopUps((prevArray) => {
        const newMessage: PopUpObject = { success: false, message: errorMessage, id: `${Date.now()}-${Math.random()}`, undoBtn: false };
        return [newMessage, ...prevArray];
      });
      return;
    } else {
      createNewFile();
    }
  }

  async function createNewFile() {
    if (pdfFile !== null) {
      const pdfFileArrayBuffer = await pdfFile.arrayBuffer();
      const [isFileCreated, savedFileName] = await window.api.createNewPDF(selectedPageArray, saveFolderPath, newFileName, pdfFileArrayBuffer);
      setHiddenPages((prevArray) => {
        let newArray: number[] = [...prevArray];
        for (const page of selectedPageArray) {
          if (!prevArray.includes(page)) {
            newArray.push(page);
          }
        }
        return newArray.sort((a, b) => a - b);
      });

      if (isFileCreated) {
        setCurrentPopUps((prevArray) => {
          const newMessage: PopUpObject = { success: true, message: `File ${savedFileName} Created.`, id: `${Date.now()}-${Math.random()}`, undoBtn: true, fileName: savedFileName, saveLocation: saveFolderPath, hiddenPages: selectedPageArray };
          return [newMessage, ...prevArray];
        });
        setSelectedPageArray([]);
        setNewFileName('');

        if (pdfDisplayDivRef.current !== null) {
          pdfDisplayDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }
      }
    }
  }

  function hidePages() {
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
    setCurrentPopUps((prevArray) => {
      const newMessage: PopUpObject = { success: true, message: `Pages Hidden.`, id: `${Date.now()}-${Math.random()}`, undoBtn: false };
      return [newMessage, ...prevArray];
    });
  }

  function resetHiddenPages() {
    setHiddenPages([]);
    setCurrentPopUps((prevArray) => {
      const newMessage: PopUpObject = { success: true, message: `Pages Revealed.`, id: `${Date.now()}-${Math.random()}`, undoBtn: false };
      return [newMessage, ...prevArray];
    });
  }

  return (
    <>
      <header className={styles.headerContainer}>
        <h1>PDF Splitter</h1>
        <div className={styles.innerHeaderContainer}>
          <LabeledCheckBox alterValue={setIsViewTwoPages} labelText="Two Pages" />
          <SaveFolder setSaveFolderPath={setSaveFolderPath} saveFolderPath={saveFolderPath} isModalShown={isModalShown} toggleModal={toggleModal} />
        </div>
      </header>
      <main className={styles.mainContainer}>
        <div className={styles.userControlsContainer}>
          <div>
            <div className={styles.hiddenPageControls}>
              <div>
                <button className="interfaceButton" onClick={resetHiddenPages}>
                  Show All Pages
                </button>
                <button className="interfaceButton" onClick={hidePages}>
                  Hide Pages
                </button>
              </div>
              <LabeledCheckBox alterValue={setArePagesHidden} labelText="Hide Pages" />
            </div>
          </div>
          <div>
            <PDFFileSelector labelText={'Choose PDF File:'} setFile={loadDisplayPDF} currentFile={pdfFile} />
            <PageSelectionDisplay selectedPageArray={selectedPageArray} />
          </div>
          <div>
            <LabeledInput setValue={setNewFileName} currentValue={newFileName} labelText="File Name" triggerFileCreation={checkForFileCreation} />
            <button onClick={checkForFileCreation} className="interfaceButton">
              Split PDF
            </button>
          </div>
          <PopUpContainer popUpsArray={currentPopUps} alterPopUpsArray={setCurrentPopUps} alterHiddenPagesArray={setHiddenPages} />
        </div>
        <PDFDisplayContainer PDFURLsArray={PDFURLsArray} isViewTwoPages={isViewTwoPages} addPageToArray={addPageToArray} hiddenPagesArray={hiddenPages} arePagesHidden={arePagesHidden} divRef={pdfDisplayDivRef} />
      </main>
    </>
  );
}
