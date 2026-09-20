/**
 * Electron shell for Stick Drift Fix remapper.
 * On Windows with ViGEmBus installed, extend this process to:
 *  1) poll gamepad axes
 *  2) apply deadzone/recenter from a saved profile JSON
 *  3) write axes to a ViGEm virtual Xbox pad
 *
 * Native ViGEm bindings are Windows-only — implement via node-ffi / vigemclient on a Windows build machine.
 */
const { app, BrowserWindow, shell } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 800,
    backgroundColor: '#020617',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  // Load the built web UI when available; fall back to local placeholder.
  const distIndex = path.join(__dirname, '..', 'dist', 'index.html')
  const fs = require('fs')
  if (fs.existsSync(distIndex)) {
    win.loadFile(distIndex)
  } else {
    win.loadURL('http://localhost:5173')
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
