import { PopUpObject } from '@renderer/utils/types';
import styles from './styles/pop-up.module.css';

interface PopUpProps {
  popUp: PopUpObject;
}

export function PopUp({ popUp }: PopUpProps) {
  return (
    <div>
      <h2 className={`${popUp.success ? styles.successfulMessage : styles.errorMessage}`}>{popUp.message}</h2>
    </div>
  );
}
