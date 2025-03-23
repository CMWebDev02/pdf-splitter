import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      splitPDF: (pdfFilePath: ArrayBuffer) => Promise<string[]>;
      createNewPDF: (selectedPages: number[], saveFolderPath: string, newFileName: string, pdfFile: ArrayBuffer) => boolean;
      getHomeDirectory: () => string;
      getDirectoryFolders: (dirPath: string) => Promise<Dirent[]>;
      joinPaths: (pathsArr: string[]) => string;
      parentPath: (pathString: string) => string;
      getUserHomeDir: () => string;
    };
  }
}
