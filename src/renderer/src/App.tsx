import { useEffect, useState } from "react"
import { EmbeddedPDF } from "./components/EmbeddedPDF";

export function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [ PDFURLsArray, setPDFURLsArray ] = useState<string[]>([]);

  const [ selectedPageArray, setSelectedPageArray ] = useState<number[]>([])

  useEffect(() => {
    async function loadURLS() {
      const urls = await window.api.splitPDF();
      setPDFURLsArray(urls);
    }

    loadURLS();
  }, [])

  function addPageToArray(page: number) {
    setSelectedPageArray(prevPages => {
      let newPageArray: number[] = [];
      if (prevPages.includes(page)) {
        newPageArray = [...prevPages].filter(currentPage => currentPage !== page);
      } else {
        newPageArray = [...prevPages, page];
      }
      return newPageArray.sort((a, b) => a - b);
    })
  }

  function createNewPDF() {
    if (selectedPageArray.length > 0) return;

    
  }

  return (
    <>
      <h1>{selectedPageArray}</h1>
      {PDFURLsArray.length !== 0 && PDFURLsArray.map((PDFURL, index) => <EmbeddedPDF key={`pdf-page-${index}`} pdfSRC={PDFURL} index={index} addPageToArray={addPageToArray} />)}
      <button onClick={createNewPDF}>Split PDF</button>
    </>

  )
}
