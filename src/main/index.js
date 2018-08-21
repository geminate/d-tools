import path from 'path';
import {app, Tray, Menu, BrowserWindow, ipcMain} from 'electron';

import IPC from '../IPC.js';

let tray = null, isMax = false, mainWindow;

if (process.env.NODE_ENV !== 'development') {
    global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`;

const template = [{
    label: "编辑",
    submenu: [
        {label: "撤销", accelerator: "CmdOrCtrl+Z", role: "undo", selector: 'undo:'},
        {label: "重做", accelerator: "Shift+CmdOrCtrl+Z", role: "redo", selector: 'redo:'},
        {label: "剪切", accelerator: "CmdOrCtrl+X", role: "cut", selector: 'cut:'},
        {label: "复制", accelerator: "CmdOrCtrl+C", role: "copy", selector: 'copy:'},
        {label: "粘贴", accelerator: "CmdOrCtrl+V", role: "paste", selector: 'paste:'},
        {label: "全选", accelerator: "CmdOrCtrl+A", role: "selectall", selector: 'selectAll:'}
    ]
}];


const createWindow = () => {
    if (process.platform === 'darwin') {
        Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    } else {
        Menu.setApplicationMenu(null);
    }
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
    let iconPath = path.join(__static, 'icons/16x16.png');
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