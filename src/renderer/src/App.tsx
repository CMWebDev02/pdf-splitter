import { useEffect, useState } from "react"

export function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [ url, setURL ] = useState(''); 
  
  useEffect(() => {
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

    async function retrieveURL() {
      const PDF = await window['pdf'].pdfURL()
      // const pdfBlob = new Blob([PDF], {type: "application/pdf"});
      // const blobURL = URL.createObjectURL(pdfBlob);
      const newBlob = decodePDFIntoBlob(PDF)
      setURL(newBlob);
    }

    retrieveURL();
  }, [])

  return (
    <>
      <iframe src={url}/> 
      <h1>Test</h1>
    </>

  )
}
