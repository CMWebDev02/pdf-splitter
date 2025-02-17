import { useEffect, useState } from "react"
import { EmbeddedPDF } from "./components/EmbeddedPDF";
import { getPDFURLs } from "./utils/pdf";

export function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [ PDFURLsArray, setPDFURLsArray ] = useState<string[]>([]); 

  useEffect(() => {
    async function loadURLS() {
      const urls = await getPDFURLs();
      setPDFURLsArray(urls);
    }

    loadURLS();
  }, [])

  return (
    <>
      <h1>Test</h1>
      {PDFURLsArray.length !== 0 && PDFURLsArray.map(PDFURL => <EmbeddedPDF pdfSRC={PDFURL} />)}
    </>

  )
}
