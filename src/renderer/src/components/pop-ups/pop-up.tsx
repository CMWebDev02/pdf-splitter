import { PopUpObject } from '@renderer/utils/types';
import styles from './styles/pop-up.module.css';

interface PopUpProps {
  popUp: PopUpObject;
  undoFileCreation: (elementID: string) => void;
}

export function PopUp({ popUp, undoFileCreation }: PopUpProps) {
  function handleClick() {
    undoFileCreation(popUp.id);
  }

  return (
    <div>
      <h2 className={`${popUp.success ? styles.successfulMessage : styles.errorMessage}`}>{popUp.message}</h2>
      {popUp.undoBtn && <button onClick={handleClick}>Undo</button>}
    </div>
  );
}
