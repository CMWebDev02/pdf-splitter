import { PopUpObject } from '@renderer/utils/types';
import { PopUp } from './pop-up';

import styles from './styles/pop-up-container.module.css';

interface PopUpContainerProps {
  popUpsArray: PopUpObject[];
}

export function PopUpContainer({ popUpsArray }: PopUpContainerProps) {
  return <div className={styles.mainContainer}>{popUpsArray.length > 0 && popUpsArray.map((popUp) => <PopUp popUp={popUp} key={popUp.time} />)}</div>;
}
