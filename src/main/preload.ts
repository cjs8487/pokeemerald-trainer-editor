// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
    selectWorkingFolder: () => ipcRenderer.invoke('selectFolder'),
    prepare: (folder: string) => ipcRenderer.invoke('prepare', folder),
    storedFolder: () => ipcRenderer.invoke('storedFolder'),
    setValuesOnLoad: (
        callback: (event: IpcRendererEvent, folder: string) => void,
    ) => ipcRenderer.on('valuesLoaded', callback),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
