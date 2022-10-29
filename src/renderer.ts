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
