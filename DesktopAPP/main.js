const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200, // 增加窗口寬度以適應 Melody Composer 的佈局
        height: 800,
        frame: false, // 隱藏系統標題列
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: false,
        },
        icon: path.join(__dirname, 'logo.png'), 
    });

    win.setMaximizable(true);
    win.loadFile('home.html');

    // 自定義菜單欄
    const menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                { label: 'New', click: () => win.webContents.send('new-file') },
                { label: 'Save', click: () => win.webContents.send('save-file') },
                { label: 'Load', click: () => win.webContents.send('load-file') },
                { type: 'separator' },
                { label: 'Quit', click: () => app.quit() },
            ],
        },
        {
            label: 'Help',
            submenu: [
                { label: 'About', click: () => win.webContents.send('show-about') },
            ],
        },
    ]);
    Menu.setApplicationMenu(menu);
}

function createSplashScreen() {
    const splash = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    splash.loadFile('splash.html');
    return splash;
}

app.whenReady().then(() => {
    const splash = createSplashScreen();
    setTimeout(() => {
        createWindow();
        splash.close();
    }, 1500); // 顯示啟動畫面 3 秒
});

// 窗口控制事件
ipcMain.on('minimize-window', (event) => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) win.minimize();
});

ipcMain.on('maximize-window', (event) => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
        if (win.isMaximized()) {
            win.unmaximize();
        } else {
            win.maximize();
        }
    }
});

ipcMain.on('close-window', (event) => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) win.close();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});