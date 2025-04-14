import { EmbeddedPDF } from './embedded-pdf';
import styles from './styles/pdf-display-container.module.css';

interface PDFDisplayContainerProps {
  isViewTwoPages: boolean;
  arePagesHidden: boolean;
  PDFURLsArray: string[];
  hiddenPagesArray: number[];
  addPageToArray: (page: number) => void;
}

export function PDFDisplayContainer({ isViewTwoPages, arePagesHidden, PDFURLsArray, addPageToArray, hiddenPagesArray }: PDFDisplayContainerProps) {
  return (
    <div className={`${isViewTwoPages ? styles.twoPageView : styles.onePageView} ${styles.pdfDisplayContainer}`}>
      {PDFURLsArray.length !== 0 &&
        PDFURLsArray.map((PDFURL, index) => {
          if (!hiddenPagesArray.includes(index) || !arePagesHidden) {
            return <EmbeddedPDF key={`pdf-page-${index}`} pdfSRC={PDFURL} index={index} addPageToArray={addPageToArray} isViewTwoPages={isViewTwoPages} showSelectionIndicators={!arePagesHidden}/>;
          } else {
            return ""
          }
        })}
    </div>
  );
}
