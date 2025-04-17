export type PopUpObject = {
  id: string;
  message: string;
  success: boolean;
  undoBtn: boolean;
  fileName?: string;
  saveLocation?: string;
  hiddenPages?: number[];
};
