import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from "path";

const createWindow = (): void => 
{
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hidden',
        titleBarOverlay: true,
        webPreferences:
        {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, "preload.js"),
        }
    });

    win.loadFile('../src/index.html');
    win.webContents.openDevTools();
}

app.on('ready', () =>
{
    createWindow();

    app.on("activate", function ()
    {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0)
        {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => 
{
    if (process.platform !== "darwin") 
    {
        app.quit();
    }
});

ipcMain.on("connectbtn-clicked", (event, data) =>
{
    console.log("event received!");
    event.reply("msg-from-main", "Hello from main!");
});
