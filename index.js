'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const Tray = electron.Tray;
// const GlobalShortcut = electron.GlobalShortcut;
// const app = require('app');
// const Tray = require('tray');
// const Menu = require('menu');
// const BrowserWindow = require('browser-window');
const GlobalShortcut = require('global-shortcut');

// TODO: Enable
// report crashes to the Electron project
// require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
    // dereference the window
    // for multiple windows store them in an array
    mainWindow = null;
}

function createMainWindow() {
    const win = new BrowserWindow({
        title: 'Anything',
        width: 600,
        height: 400, // 46
        frame: false,
        center: true,
        resizable: false,
        skipTaskbar: false,
        alwaysOnTop: true,
        transparent: false,
        acceptFirstMouse: true
    });
    
    win.loadURL(`file://${__dirname}/index.html`);
    win.on('closed', onClosed);

    return win;
}

app.on('activate-with-no-open-windows', () => {
    if (!mainWindow) {
        mainWindow = createMainWindow();
    }
});

app.on('ready', () => {
    mainWindow = createMainWindow();

    const appIcon = new Tray('./tray.ico');
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' }
    ]);
    appIcon.setToolTip('Testing');
    appIcon.setContextMenu(contextMenu);

    // mainWindow.webContents.openDevTools();

    const shortcut = 'alt+x';
    const ret = GlobalShortcut.register(shortcut, () => {
        mainWindow.show();
    });

    if (!ret) {
        console.log(`Could not register global shortcut: '${shortcut}'`);
        app.exit(-1);
    }
});

app.on('blur', () => {
    mainWindow.hide();
});

app.on('will-quit', () => {
    GlobalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});