import { App, BrowserWindow, Menu, Tray } from "electron";

export function mountTray(app: App, win: BrowserWindow) {
  const tray = new Tray('icon.png')
  tray.setToolTip('我的应用')
  tray.on('click', (e) => {
    if (e.shiftKey) {
      app.quit()
    }
  })

  const menu = Menu.buildFromTemplate([
    { label: 'item1' },
    { label: 'item2', click: () => {
      win.isVisible() 
      ? win.hide() 
      : win.show()
    }}
  ])

  tray.setContextMenu(menu)
}