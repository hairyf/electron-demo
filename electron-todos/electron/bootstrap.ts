import { App, BrowserWindow } from "electron";
import { VITE_DEV_SERVER_URL } from "./constants";
import path from 'node:path'

export function withActivateReload(app: App, createWindow: Function) {
  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow()
  })
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
export function withAppClosedQuit(app: App, callback: Function) {
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
      app.quit()

      callback()
  })
}

export function withWindowVitePage(win: BrowserWindow) {
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}