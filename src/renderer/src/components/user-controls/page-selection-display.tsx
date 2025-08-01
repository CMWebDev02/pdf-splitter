import styles from './styles/page-selection.module.css';

interface PageSelectionDisplayProps {
  selectedPageArray: number[];
}

export default function PageSelectionDisplay({ selectedPageArray }: PageSelectionDisplayProps) {
  const pagesString = selectedPageArray.map((page) => page + 1).join(' ');

  return (
    <div className={styles.mainContainer}>
      <h2>Selected:</h2>
      <p>{pagesString}</p>
    </div>
  );
}
