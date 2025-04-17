import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { createNewPDF, deleteNewPDF, getPDFURIs } from './pdf';
import { getAllDrives, getFolders, getHomeDir } from './file-system';
import { getUserHomeDir, joinPaths, parentPathString } from './utils';

// Custom APIs for renderer
const api = {
  splitPDF: getPDFURIs,
  createNewPDF: createNewPDF,
  getHomeDirectory: getHomeDir,
  getDirectoryFolders: getFolders,
  joinPaths: joinPaths,
  parentPathString: parentPathString,
  getUserHomeDir: getUserHomeDir,
  getAllDrives: getAllDrives,
  deleteNewPDF: deleteNewPDF
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
