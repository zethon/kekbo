import { app, BrowserWindow, ipcMain, ipcRenderer } from 'electron';
import * as path from "path";
import * as mqtt from 'mqtt';

let mainWindow: BrowserWindow;

const createWindow = (): void => 
{
    mainWindow = new BrowserWindow(
    {
        width: 1200,
        height: 800,
        titleBarStyle: 'hidden',
        title: "ElectricOwl!",
        webPreferences:
        {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, "preload.js"),
        },

        // @ts-ignore: This gives an error on Windows, but it works fine.
        titleBarOverlay: true,
    });

    mainWindow.loadFile('../src/index.html');
    mainWindow.webContents.openDevTools();
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

let client : mqtt.MqttClient;

ipcMain.on("connectbtn-clicked", (event, data) =>
{
    const clientId = `owl_mqtt_${Math.random().toString(16).slice(3)}`
    client = mqtt.connect('mqtt://localhost:9099',
    {
        clientId: clientId,
        clean: true,
        connectTimeout: 4000,
        username: 'emqx',
        password: 'public',
        reconnectPeriod: 1000,
    });

    client.on('connect', () =>
    {
        console.log("Connected to MQTT broker!");
        // event.reply("msg-from-main", "Connected to MQTT from main!!");
    
        client.subscribe('test_topic', function() 
        {
            console.log('Subscribed');
        });
    
        // client.publish('test_topic', 'Hello mqtt from inside the callback!', () =>
        // {
        //     console.log('Connect callback message Published');
        // });
    });
    
    client.on('message', function (topic:string, message:string) 
    {
        console.log(`(SENDING FROM MAIN) topic  : '${topic}'`);
        console.log(`(SENDING FROM MAIN) message: '${message}'`);
        // let packet = { topic: topic, message: message };
        mainWindow.webContents.send("main-to-render", topic, message);
    });
});

ipcMain.on("sendmsgbtn-clicked", (event, data) =>
{
    console.log("sendmsgbtn-clicked event received!");
    client.publish('test_topic', 'Hello mqtt from a public variable!', () =>
    {
        console.log('Button message Published');
    });
});