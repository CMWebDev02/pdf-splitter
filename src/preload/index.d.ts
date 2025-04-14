import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      splitPDF: (pdfFilePath: ArrayBuffer) => Promise<string[]>;
      createNewPDF: (selectedPages: number[], saveFolderPath: string, newFileName: string, pdfFile: ArrayBuffer) => [boolean, string];
      getHomeDirectory: () => string;
      getDirectoryFolders: (dirPath: string) => Promise<Dirent[]>;
      joinPaths: (pathsArr: string[]) => string;
      parentPathString: (pathString: string, drivesList: string[]) => string;
      getUserHomeDir: () => string;
      getAllDrives: () => Promise<string[]>;
    };
  }
}
