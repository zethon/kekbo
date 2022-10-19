// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

let count = 0;

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
