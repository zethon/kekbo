import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from "path";
import * as mqtt from 'mqtt';

const createWindow = (): void => 
{
    let win = new BrowserWindow(
    {
        width: 800,
        height: 600,
        // titleBarStyle: 'hidden',
        title: "ElectricOwl!",
        webPreferences:
        {
            // worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, "preload.js"),
        },

        // @ts-ignore: This gives an error on Windows, but it works fine.
        // titleBarOverlay: true,
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
    let client = mqtt.connect('mqtt://localhost:9099');
    // console.log(client);
    // console.log("event received!");
    // event.reply("msg-from-main", "Hello from main!");

    client.on('connect', () =>
    {
        console.log("Connected to MQTT broker!");
        event.reply("msg-from-main", "Connected to MQTT from main!!");

        client.subscribe('test', function() 
        {
            console.log('Subscribed');
        });
    });

    client.on('message', function (topic:string, message:string) 
    {
        // message is Buffer
        console.log("topic: " + topic);
        console.log("message: " + message.toString());
        client.end()
    });
});
