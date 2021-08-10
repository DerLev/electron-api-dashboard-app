const { app, BrowserWindow, ipcMain, Tray, Menu, shell } = require('electron');
const path = require('path');
const url = require('url');
const pjson = require('../package.json');
const AutoLaunch = require('auto-launch');
const { autoUpdater } = require('electron-updater');
const Store = require('./store.js');

let gotTheLock
if(!process.env.ELECTRON_START_URL) {
  gotTheLock = app.requestSingleInstanceLock();
} else {
  gotTheLock = true;
}

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 1280, height: 720 },
    windowMaximized: false,
    autoStart: true,
    minimizeToTray: true
  }
});

let mainWindow;
let tray;
let autoLaunch;

function createWindow() {
  let { width, height } = store.get('windowBounds');

  mainWindow = new BrowserWindow({
    width,
    height,
    minWidth: 940,
    minHeight: 500,
    fullscreenable: false,
    icon: path.join(__dirname, '/../build/icon-256x256.png'),
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    show: false
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  mainWindow.loadURL(startUrl);

  if(process.env.ELECTRON_START_URL) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  });

  listeners();

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdates();
    mainWindow.show();
  });

  let windowMaximized = store.get('windowMaximized');
  if(windowMaximized == true) {
    mainWindow.maximize();
  }
}

app.on('ready', () => {
  
  if(!gotTheLock) {
    app.quit();
  } else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      if (mainWindow) {
        if (!mainWindow.isVisible()) mainWindow.show();
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
        autoUpdater.checkForUpdates();
      }
    })
      
    createWindow();

    tray = new Tray(path.join(__dirname, '/../build/icon.png'));
    tray.setToolTip(pjson.productName);
    tray.on('click', () => {
      mainWindow.show();
      autoUpdater.checkForUpdates();
    });

    const trayMenuTemplate = [
      {
        label: pjson.productName,
        sublabel: 'v' + pjson.version,
        enabled: false,
        icon: path.join(__dirname, '/../build/trayMenu.png')
      },
      {
        type: 'separator'
      },
      {
        label: 'Open App',
        click: () => {mainWindow.show(); autoUpdater.checkForUpdates();}
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit App',
        click: () => app.quit()
      }
    ];
    const trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
    tray.setContextMenu(trayMenu);

    let autoStart = store.get('autoStart');

    if(!process.env.ELECTRON_START_URL) {
      autoLaunch = new AutoLaunch({
        name: pjson.productName,
        path: app.getPath('exe'),
      });
      autoLaunch.isEnabled().then((isEnabled) => {
        if (!isEnabled && autoStart) autoLaunch.enable();
        if (!autoStart) autoLaunch.disable();
      });
    }
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

const listeners = () => {
  mainWindow.on('maximize', () => {
    store.set('windowMaximized', true);
  });
  
  mainWindow.on('unmaximize', () => {
    store.set('windowMaximized', false);
  });
  
  mainWindow.on('resize', () => {
    let { width, height } = mainWindow.getBounds();
    let windowMaximized = store.get('windowMaximized');
    setTimeout(() => {
      if(windowMaximized == false) {
        store.set('windowBounds', { width, height });
      }
    }, 10);
  });
}

ipcMain.on('window', (e, arg) => {
  if(arg == 'close') {
    let minimizeToTray = store.get('minimizeToTray');
    if(minimizeToTray) {
      mainWindow.hide();
    } else {
      mainWindow.close();
      mainWindow = null;
    }
  }

  if(arg == 'maximize') {
    let windowMaximized = store.get('windowMaximized');

    if (windowMaximized == true) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }

  if(arg == 'minimize') {
    mainWindow.minimize();
  }
});

ipcMain.on('app', (e, arg) => {
  if(arg == 'title') {
    e.returnValue = pjson.productName;
  }

  if(arg == 'version') {
    e.returnValue = app.getVersion();
  }

  if(arg == 'update') {
    autoUpdater.quitAndInstall();
  }

  if(arg == 'autostart-disable') {
    autoLaunch.disable();
    store.set('autoStart', false);
  }

  if(arg == 'autostart-enable') {
    autoLaunch.enable();
    store.set('autoStart', true);
  }
});

ipcMain.on('menu', (e, arg) => {
  if(arg == 'appBar') {
    let autoStart = store.get('autoStart');
    let minimizeToTray = store.get('minimizeToTray');

    const appBarMenuTemplate = [
      {
        label: pjson.productName,
        sublabel: 'v' + pjson.version,
        enabled: false,
        icon: path.join(__dirname, '/../build/trayMenu.png')
      },
      {
        type: 'separator'
      },
      {
        label: 'Auto Start',
        type: 'submenu',
        submenu: [
          {
            label: 'Enabled',
            type: 'radio',
            checked: autoStart,
            click: () => { autoLaunch.enable(); store.set('autoStart', true); }
          },
          {
            label: 'Disabled',
            type: 'radio',
            checked: !autoStart,
            click: () => { autoLaunch.disable(); store.set('autoStart', false); }
          }
        ]
      },
      {
        label: 'Minimize to tray',
        type: 'submenu',
        submenu: [
          {
            label: 'Enabled',
            type: 'radio',
            checked: minimizeToTray,
            click: () => { store.set('minimizeToTray', true) }
          },
          {
            label: 'Disabled',
            type: 'radio',
            checked: !minimizeToTray,
            click: () => { store.set('minimizeToTray', false) }
          }
        ]
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit App',
        click: () => app.quit()
      }
    ];
    const appBarMenu = Menu.buildFromTemplate(appBarMenuTemplate);
    appBarMenu.popup();
  }
});

ipcMain.on('link', (e, arg) => {
  shell.openExternal(arg);
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update', 'available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update', 'downloaded');
});
