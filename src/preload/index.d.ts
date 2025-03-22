import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      splitPDF: (pdfFilePath: ArrayBuffer) => Promise<string[]>;
      createNewPDF: (selectedPages: number[], saveFolderPath: string, newFileName: string, pdfFile: ArrayBuffer) => boolean;
      getSaveLocation: () => Promise<string>;
      updateSaveLocation: (newDirectoryPath: string) => void;
      getDirectoryFolders: (dirPath: string) => Promise<Dirent[]>;
      joinPaths: (pathsArr: string[]) => string;
      parentPath: (pathString: string) => string;
      getUserHomeDir: () => string;
    };
  }
}
