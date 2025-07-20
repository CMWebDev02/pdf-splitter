import type { Dispatch, SetStateAction } from 'react';
import type { PopUpObject } from '@renderer/utils/types';
import { PopUp } from './pop-up';

import styles from './styles/pop-up-container.module.css';

interface PopUpContainerProps {
  popUpsArray: PopUpObject[];
  alterPopUpsArray: Dispatch<SetStateAction<PopUpObject[]>>;
  alterHiddenPagesArray: Dispatch<SetStateAction<number[]>>;
}

export function PopUpContainer({ popUpsArray, alterPopUpsArray, alterHiddenPagesArray }: PopUpContainerProps) {
  async function undoFileCreation(elementID: string) {
    try {
      let selectedPopUp: PopUpObject | null = null;

      for (const popUp of popUpsArray) {
        if (popUp.id === elementID) {
          selectedPopUp = popUp;
          break;
        }
      }

      if (selectedPopUp === null) throw new Error('No Associated PopUp Found');

      if (selectedPopUp.fileName && selectedPopUp.saveLocation) {
        const isFileDeleted = await window.api.deleteNewPDF(selectedPopUp.saveLocation, selectedPopUp.fileName);

        if (!isFileDeleted) throw new Error('Failed To Delete File!');

        alterPopUpsArray((prevPopUpsArray) => {
          const newPopUpsArray = prevPopUpsArray.filter((popUp) => popUp.id !== elementID);
          const newPopUp: PopUpObject = {
            id: `${Date.now()}-${Math.random()}`,
            success: true,
            message: `Undone File ${selectedPopUp.fileName} Creation.`,
            undoBtn: false
          };
          return [newPopUp, ...newPopUpsArray];
        });

        alterHiddenPagesArray((prevHiddenPagesArray) => {
          const selectedPopUpsHiddenPages = selectedPopUp.hiddenPages;
          // Filter through the current hidden pages array, if the page number associated with the current popup
          // Remove the number from the array.
          const newHiddenPagesArray = prevHiddenPagesArray.filter((pageNum) => !selectedPopUpsHiddenPages?.includes(pageNum));
          return newHiddenPagesArray;
        });
      }
    } catch (error) {
      console.error(error);
      alterPopUpsArray((prevPopUpsArray) => {
        const newPopUp: PopUpObject = {
          id: `${Date.now()}-${Math.random()}`,
          success: false,
          message: `Undo action failed.`,
          undoBtn: false
        };
        return [newPopUp, ...prevPopUpsArray];
      });
    }
  }

  return <div className={styles.mainContainer}>{popUpsArray.length > 0 && popUpsArray.map((popUp) => <PopUp key={popUp.id} popUp={popUp} undoFileCreation={undoFileCreation} />)}</div>;
}
