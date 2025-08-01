import { useState } from 'react';
import styles from './styles/embedded-pdf.module.css';

interface EmbeddedPDFProps {
  pdfSRC: string;
  index: number;
  addPageToArray: (page: number) => void;
  isViewTwoPages: boolean;
  showSelectionIndicators: boolean;
}

export function EmbeddedPDF({ pdfSRC, index, addPageToArray, isViewTwoPages, showSelectionIndicators }: EmbeddedPDFProps) {
  const [isPageInArray, setIsPageInArray] = useState<boolean>(false);

  function handleClick() {
    addPageToArray(index);
    setIsPageInArray(!isPageInArray);
  }

  return (
    <div className={`${isViewTwoPages ? styles.twoPageView : styles.onePageView} ${styles.mainContainer}`}>
      <iframe src={`${pdfSRC}#toolbar=0`} className={styles.pdfPage} />
      <div onClick={handleClick} className={`${styles.interactiveDiv} ${isPageInArray && !showSelectionIndicators ? styles.selectedDiv : styles.unselectedDiv}`}>
        {index + 1}
      </div>
    </div>
  );
}
