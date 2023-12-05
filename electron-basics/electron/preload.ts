import { clipboard, contextBridge, ipcRenderer, nativeImage } from 'electron'
import { domReady, withPrototype } from './utils'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', withPrototype(ipcRenderer))
contextBridge.exposeInMainWorld('api', {
  copy() {
    clipboard?.writeText('hello clipboard')
  },
  show() {
    const text = clipboard.readText()
    alert(text)
  },
  async capture() {
    const sources = await ipcRenderer.invoke('capture-event') as Electron.DesktopCapturerSource[]
    for (const source of sources) {
      if (source.id === 'screen:0:0') {
        return source.thumbnail.toDataURL()
      }
    }
  },
  logNativeImage() {
    const image = nativeImage.createFromPath('./images/icon@2x.png')
    console.log(image)
  }
})

// --------- Preload scripts loading ---------

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const safeDOM = {
    append(parent: HTMLElement, child: HTMLElement) {
      if (!Array.from(parent.children).find(e => e === child)) {
        parent.appendChild(child)
      }
    },
    remove(parent: HTMLElement, child: HTMLElement) {
      if (Array.from(parent.children).find(e => e === child)) {
        parent.removeChild(child)
      }
    },
  }

  const className = `loaders-css__square-spin`
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `
  const oStyle = document.createElement('style')
  const oDiv = document.createElement('div')

  oStyle.id = 'app-loading-style'
  oStyle.innerHTML = styleContent
  oDiv.className = 'app-loading-wrap'
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle)
      safeDOM.append(document.body, oDiv)
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle)
      safeDOM.remove(document.body, oDiv)
    },
  }
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

window.onmessage = ev => {
  ev.data.payload === 'removeLoading' && removeLoading()
}

setTimeout(removeLoading, 4999)
