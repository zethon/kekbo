// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

// let appdiv = document.getElementById("apptitle");
// appdiv.innerHTML = "App Version: " + (window as any).appversion.version();

let connectbtn = document.getElementById("connectbtn");
connectbtn.addEventListener("click", () => 
{
    console.log("connectbtn clicked");
    (window as any).Bridge.sendSubmit("test");
});

// let mqtt = (window as any).mqtt;

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

// // const mqtt = require('mqtt')
// // import * as mqtt from "mqtt"
// const options = {
//   // Clean session
//   clean: true,
//   connectTimeout: 4000,
//   // Auth
//   clientId: 'emqx_test',
//   username: 'emqx_test',
//   password: 'emqx_test',
// }
// const client  = mqtt.connect('mqtt://broker.emqx.io:1883', options)

// console.log(JSON.stringify(client));

// client.on('connect', function () {
//   console.log('Connected')
//   client.subscribe('test', function() 
//   {
//     console.log('Subscribed')
//   })
// })

// client.on('message', function (topic:string, message:string) {
//   // message is Buffer
//   console.log(message.toString())
//   client.end()
// })

