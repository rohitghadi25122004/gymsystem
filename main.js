const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

// Create the window when Electron is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Allow using Node.js features in the frontend
      preload: path.join(__dirname, 'preload.js') // Link to preload.js for security
    }
  });

  // Load the HTML file from the dashboard folder
  mainWindow.loadFile(path.join(__dirname,'src', 'dashboard', 'index.html'));

  
  // Open DevTools (optional, for debugging)
  // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  // On macOS, re-create the window when the app is activated (if there are no windows)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
