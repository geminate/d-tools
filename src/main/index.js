import path from 'path';
import {app, Tray, Menu, BrowserWindow, ipcMain} from 'electron';

import IPC from '../IPC.js';

let tray = null, isMax = false, mainWindow;

if (process.env.NODE_ENV !== 'development') {
    global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`;

const createWindow = () => {
    Menu.setApplicationMenu(null);
    mainWindow = new BrowserWindow({
        height: 728,
        width: 1024,
        minWidth: 500
    });

    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null
    });


};

const createTray = () => {
    let iconPath = path.join(__static, 'icons/256x256.png');
    tray = new Tray(iconPath);
    const contextMenu = Menu.buildFromTemplate([
        {label: '退出', type: 'normal', role: 'quit'}
    ]);
    tray.setContextMenu(contextMenu);
    tray.setToolTip("d-tools");
};

app.on('ready', () => {
    createTray();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});