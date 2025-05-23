/* eslint-disable no-continue */
/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import {
    app,
    BrowserWindow,
    dialog,
    ipcMain,
    IpcMainInvokeEvent,
    protocol,
    shell,
} from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import { createReadStream } from 'fs';
import { access } from 'fs/promises';
import { ShowdownParser } from 'koffing';
import path from 'path';
import { createInterface } from 'readline/promises';
import { Trainer } from '../shared/types';
import MenuBuilder from './menu';
import { protocolHandler } from './protocols';
import { getWorkingDirectory, setWorkingDirectory } from './store';
import { getAssetPath, resolveHtmlPath } from './util';

class AppUpdater {
    constructor() {
        log.transports.file.level = 'info';
        autoUpdater.logger = log;
        autoUpdater.checkForUpdatesAndNotify();
    }
}

let mainWindow: BrowserWindow | null = null;

const selectFolder = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openDirectory'],
    });
    if (!canceled) {
        setWorkingDirectory(filePaths[0]);
        return filePaths[0];
    }
    return null;
};

const prepare = async (_: IpcMainInvokeEvent, folder: string) => {
    let hasAppData = false;
    try {
        await access(path.join(folder, 'src', 'data', 'trainers'));
        hasAppData = true;
    } catch {
        hasAppData = false;
    }
    if (hasAppData) {
        // confirm that data may be overwritten
    } else {
        // create src/data/trainers
    }
    // parse opponents.h
    // parsse trainer file
    const fileStream = createReadStream(
        path.join(folder, 'src', 'data', 'trainers.party'),
        { encoding: 'utf8' },
    );

    const trainers: { [k: string]: Trainer } = {};
    const rl = createInterface(fileStream);

    const emptyTrainer: Trainer = {
        name: '',
        class: '',
        pic: '',
        gender: 'Male',
        music: '',
        doubleBattle: false,
        ai: [],
        items: [],
    };
    let currTrainer = emptyTrainer;
    let currKey = '';
    let processingTrainer = false;
    let processingPokemon = false;
    let inComment = false;
    let teamStr = '';

    // eslint-disable-next-line no-restricted-syntax
    for await (const line of rl) {
        if (!inComment) {
            if (line.startsWith('/*') && !line.endsWith('*/')) {
                inComment = true;
                continue;
            }
            // single line block comment
            if (line.startsWith('/*') && line.endsWith('*/')) {
                continue;
            }
        }
        if (inComment && line.endsWith('*/')) {
            inComment = false;
            continue;
        }
        if (inComment) {
            continue;
        }
        if (line.startsWith('===')) {
            if (currKey) {
                const showdownParser = new ShowdownParser(teamStr);
                const team = showdownParser.parse();
                currTrainer.pokemon = team.teams[0].pokemon;
                trainers[currKey] = currTrainer;
                currTrainer = structuredClone(emptyTrainer);
                processingTrainer = true;
                processingPokemon = false;
                teamStr = '';
            }
            currKey = line.split('===')[1].trim();
        } else if (line.trim() === '') {
            // empty lines come between trainers and pokemon
            if (processingTrainer && !processingPokemon) {
                processingTrainer = false;
                processingPokemon = true;
            } else if (processingPokemon) {
                teamStr += '\n';
            }
        } else if (processingPokemon) {
            teamStr += `${line}\n`;
        } else {
            const parts = line.trim().split(':');
            const key = parts[0].trim();
            const value = parts[1].trim();

            switch (key) {
                case 'Name':
                    currTrainer.name = value;
                    break;
                case 'Pic':
                    currTrainer.pic = value;
                    break;
                case 'Class':
                    currTrainer.class = value;
                    break;
                case 'Gender':
                    if (value === 'Male' || value === 'Female') {
                        currTrainer.gender = value;
                    }
                    break;
                case 'Music':
                    currTrainer.music = value;
                    break;
                case 'Items':
                    currTrainer.items = value.split(' / ');
                    break;
                case 'Double Battle':
                    if (value === 'Yes') {
                        currTrainer.doubleBattle = true;
                    } else {
                        currTrainer.doubleBattle = false;
                    }
                    break;
                case 'AI':
                    currTrainer.ai = value.split(' / ');
                    break;
                case 'Mugshot':
                    if (
                        value === 'Purple' ||
                        value === 'Green' ||
                        value === 'Pink' ||
                        value === 'Blue' ||
                        value === 'Yellow'
                    ) {
                        currTrainer.mugshot = value;
                    }
                    break;
                case 'Starting Status':
                    break;
                default:
                    break;
            }
        }
    }

    // load supporting data
    // include/constants/trainers.h
    const trainerConstantsPath = path.join(
        folder,
        'include',
        'constants',
        'trainers.h',
    );
    const trainerConstantsStream = createReadStream(trainerConstantsPath);
    const trainerConstantsRl = createInterface(trainerConstantsStream);

    const trainerPics: string[] = [];
    const trainerClasses: string[] = [];
    const encounterMusic: string[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for await (const line of trainerConstantsRl) {
        if (line.startsWith('#define')) {
            const [, constName] = line.split(' ');
            const matches = constName.match(/TRAINER_(?<type>.*?)_(?<name>.*)/);
            const type = matches?.groups?.type;
            const rawName = matches?.groups?.name;
            if (type && rawName) {
                const name = rawName
                    .toLowerCase()
                    .split('_')
                    .map(
                        (word) =>
                            word.charAt(0).toUpperCase() + word.substring(1),
                    )
                    .join(' ');
                switch (type) {
                    case 'PIC':
                        trainerPics.push(name);
                        break;
                    case 'CLASS':
                        trainerClasses.push(name);
                        break;
                    case 'ENCOUNTER':
                        // eslint-disable-next-line no-case-declarations
                        const parts = name.split(' ');
                        parts.shift();
                        encounterMusic.push(parts.join(' '));
                        break;
                    default:
                        break;
                }
            }
        }
    }

    return {
        trainers,
        trainerPics,
        trainerClasses,
        encounterMusic,
    };
};

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

const isDebug =
    process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
    require('electron-debug').default();
}

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS'];

    return installer
        .default(
            extensions.map((name) => installer[name]),
            forceDownload,
        )
        .catch(console.log);
};

const createWindow = async () => {
    if (isDebug) {
        await installExtensions();
    }

    mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        icon: getAssetPath('icon.png'),
        webPreferences: {
            preload: app.isPackaged
                ? path.join(__dirname, 'preload.js')
                : path.join(__dirname, '../../.erb/dll/preload.js'),
        },
    });

    mainWindow.loadURL(resolveHtmlPath('index.html'));

    mainWindow.on('ready-to-show', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            mainWindow.show();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    mainWindow.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url);
        return { action: 'deny' };
    });

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    new AppUpdater();

    if (getWorkingDirectory()) {
        mainWindow.webContents.send('valuesLoaded', getWorkingDirectory());
    }
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.whenReady()
    .then(() => {
        ipcMain.handle('selectFolder', selectFolder);
        ipcMain.handle('prepare', prepare);
        ipcMain.handle('storedFolder', getWorkingDirectory);
        createWindow();
        protocol.handle('porytrainer', protocolHandler);
        app.on('activate', () => {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (mainWindow === null) createWindow();
        });
    })
    .catch(console.log);
