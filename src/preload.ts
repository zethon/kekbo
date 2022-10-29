import { contextBridge, ipcMain, ipcRenderer, app } from 'electron';

// https://github.com/electron/electron/issues/35587
// import * as appversion from 'appversion';
// contextBridge.exposeInMainWorld('appversion', appversion);

let sendSubmit = (data: any) =>
{
    console.log("Send Submit: " + data);
    ipcRenderer.send("connectbtn-clicked", data);
    ipcRenderer.on("msg-from-main", (event, data) =>
    {
        console.log("message from main received!!: " + data);
    });
};

let indexBridge = 
{
    sendSubmit: sendSubmit,
};

contextBridge.exposeInMainWorld("Bridge", indexBridge);
