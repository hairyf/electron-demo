import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import { VITE_WINDOW_ICON_URL } from './constants'
import { withActivateReload, withAppClosedQuit, withWindowVitePage } from './bootstrap'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │

let win: BrowserWindow | null

const options: Electron.BrowserWindowConstructorOptions = {
  icon: VITE_WINDOW_ICON_URL,
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
  },
  frame: false,
  width: 800,
  height: 500,
  maxHeight: 600,
  maxWidth: 1000,
  minHeight: 200,
  minWidth: 300
}

function createWindow() {
  win = new BrowserWindow(options)

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })
  
  ipcMain.on('close', () => win?.close())
  ipcMain.on('full', () => {
   !win?.isMaximized()
      ? win?.maximize()
      : win?.restore()
  })
  ipcMain.on('hide', () => {
    !win?.isMaximized() && win?.minimize()
  })
  // ipcRenderer.on('full', () => win!.fullScreen = true)
  // ipcRenderer.on('hide', () => win!.hide())
  withWindowVitePage(win)
}

withAppClosedQuit(app, () => win = null)

withActivateReload(app, createWindow)

app.whenReady().then(createWindow)
