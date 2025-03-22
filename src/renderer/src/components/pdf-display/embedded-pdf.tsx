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
      <div onClick={handleClick} className={`${styles.interactiveDiv} ${styles.unselectedDiv}`}>{index + 1}</div>
    </div>
  );
}
