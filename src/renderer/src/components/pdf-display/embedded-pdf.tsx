import styles from "./styles/embedded-pdf.module.css";

interface EmbeddedPDFProps {
  pdfSRC: string;
  index: number;
  addPageToArray: (page: number) => void;
}

export function EmbeddedPDF({ pdfSRC, index, addPageToArray }: EmbeddedPDFProps) {
  function handleClick() {
    addPageToArray(index);
  }

  return (
    <div className={styles.mainContainer}>
      <iframe src={`${pdfSRC}#toolbar=0`} className={styles.pdfPage} />
      <button onClick={handleClick}>Page#{index}</button>
    </div>
  );
}
