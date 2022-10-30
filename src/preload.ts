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

let sendMessage = (data: any) =>
{
    console.log("Send Submit: " + data);
    ipcRenderer.send("sendmsgbtn-clicked", data);
};

let indexBridge = 
{
    sendSubmit: sendSubmit,
    sendMessage: sendMessage,
    onMessage : onmessage,
};

contextBridge.exposeInMainWorld("Bridge", indexBridge);

contextBridge.exposeInMainWorld("api",
{
    // @ts-ignore: This gives an error on Windows, but it works fine.
    send: (channel, data) => ipcRenderer.send(channel, data),
    // @ts-ignore: This gives an error on Windows, but it works fine.
    recieve: (channel, func) => ipcRenderer.on(
        channel, args => func(args))
        // channel, (event, ...args) => func(args))
})


// // White-listed channels.
// const ipc = {
//     'render': {
//         // From render to main.
//         'send': [
//             'render-to-main'
//         ],
//         // From main to render.
//         'receive': [
//             'main-to-render'
//         ],
//         // From render to main and back again.
//         'sendReceive': [
//             'render-to-main-to-render'
//         ]
//     }
// };

// // Exposed protected methods in the render process.
// contextBridge.exposeInMainWorld(
//     // Allowed 'ipcRenderer' methods.
//     'ipcRender', {
//         // From render to main.
//         send: (channel:string, args:any) => {
//             let validChannels = ipc.render.send;
//             if (validChannels.includes(channel)) {
//                 ipcRenderer.send(channel, args);
//             }
//         },
//         // From main to render.
//         receive: (channel:string, listener:any) => 
//         {
//             console.log("ipcRender.receive: " + channel);
//             let validChannels = ipc.render.receive;
//             if (validChannels.includes(channel)) 
//             {
//                 // Deliberately strip event as it includes `sender`.
//                 ipcRenderer.on(channel, (event, ...args) => listener(...args));
//             }
//         },
//         // From render to main and back again.
//         invoke: (channel:any, args:any) => {
//             let validChannels = ipc.render.sendReceive;
//             if (validChannels.includes(channel)) {
//                 return ipcRenderer.invoke(channel, args);
//             }
//         }
//     }
// );