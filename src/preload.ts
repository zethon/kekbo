// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

// const mqtt = require('mqtt')
// const client  = mqtt.connect('mqtt://test.mosquitto.org')


let count = 0;

// function initMqtt()
// {
//   const client = mqtt.connect('mqtt://localhost:1883');
//   window.client = client;

//   client.on('connect', () =>
//     {
//       console.log('connected');
//       client.subscribe('test');
//     });

//   client.on('message', (topic, message) =>
//     {
//       console.log('received message %s %s', topic, message);
//     });
// }


window.addEventListener("DOMContentLoaded", () => 
{
  const replaceText = (selector: string, text: string) => 
  {
    const element = document.getElementById(selector);
    if (element) 
    {
      element.innerText = text;
    }
  };

  for (const type of ["chrome", "node", "electron"]) 
  {
    replaceText(`${type}-version`, process.versions[type as keyof NodeJS.ProcessVersions]);
  }

  let clickbtn = document.getElementById("countbtn");
  clickbtn.addEventListener("click", () => 
    {
      count++;
      console.log("CLICKED: " + count);
    });
  
});
