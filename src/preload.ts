
import { contextBridge, ipcRenderer } from 'electron';
import * as appversion from './appversion';

contextBridge.exposeInMainWorld('versions', { value : "1.1.2" });
contextBridge.exposeInMainWorld('appversion', appversion);
console.log(appversion.version());

// ipcRenderer.addListener("connectbtn-clicked", () =>
// {
//     console.log("connectbtn-clicked received");
// });

// const currentWindowsPID3 = remote.getCurrentWindow().id;
// console.log("currentWindowsPID3: " + currentWindowsPID3);
// let procId = remote.getCurrentWebContents().getOSProcessId();
// console.log()

// const mqtt = require('mqtt')
// import * as mqtt from "mqtt"
// (window as any).mqtt = mqtt
// console.log("preload-mqtt: " + mqtt)
// contextBridge.exposeInMainWorld('mqtt', mqtt);


// const options = {
//     // Clean session
//     clean: true,
//     connectTimeout: 4000,
//     // Auth
//     clientId: 'emqx_test',
//     username: 'emqx_test',
//     password: 'emqx_test',
//   }
//   const client  = mqtt.connect('mqtt://broker.emqx.io:1883', options)
// client.on('connect', function () {
//     console.log('Connected')
//     client.subscribe('test', function() 
//     {
//       console.log('Subscribed')
//     })
//   })