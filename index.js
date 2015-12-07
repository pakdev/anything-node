'use strict';
const app = require('app');
const Tray = require('tray');
const Menu = require('menu');
const BrowserWindow = require('browser-window');
const GlobalShortcut = require('global-shortcut');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();
var indexFile = `${__dirname}/index.html`;

if (process.env['NODE_ENV'] == 'dev') {
    indexFile = "http://localhost:9999";
}

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
        height: 46,
        frame: false,
        center: true,
        resizable: false,
        skipTaskbar: true,
        alwaysOnTop: true,
        transparent: true,
        acceptFirstMouse: true
    });
    
    if (process.env['NODE_ENV'] == 'dev') {
        // we need to wait until browsersync is ready
        setTimeout(function() {
            win.loadUrl(indexFile);
        }, 5000);
    } else {
        win.loadUrl(`file:${indexFile}`);
    }
    
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