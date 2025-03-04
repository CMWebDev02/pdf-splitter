import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      splitPDF: (pdfFilePath: ArrayBuffer) => Promise<string[]>;
      createNewPDF: (selectedPages: number[], saveFolderPath: string, newFileName: string, pdfFile: ArrayBuffer) => void;
      getSaveLocation: () => Promise<string>;
    };
  }
}
