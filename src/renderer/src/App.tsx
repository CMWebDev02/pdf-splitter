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
      return [...prevPages, page];
    })

    console.log(selectedPageArray)
  }

  return (
    <>
      {PDFURLsArray.length !== 0 && PDFURLsArray.map((PDFURL, index) => <EmbeddedPDF key={`pdf-page-${index}`} pdfSRC={PDFURL} index={index} addPageToArray={addPageToArray} />)}
    </>

  )
}
