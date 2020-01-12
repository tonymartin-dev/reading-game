const ncp = require('ncp').ncp;
const rimraf = require("rimraf");
const fs = require('fs');
const wwwFolder = './www';

console.log(`
************************************
*** MOVING FILES TO ${wwwFolder} ***
************************************
`)

const removeFolder = ()=>{
  return new Promise ((resolve, reject)=>{
    console.log(`> Removing ${wwwFolder} folder\n`)
    rimraf(wwwFolder, ()=>{
      console.log(`> ${wwwFolder} folder removed.\n`)
      resolve();
    });
  });
}

const copyDistFiles = ()=>{

  if (!fs.existsSync(wwwFolder)){
    console.log(`> Recreating ${wwwFolder} folder\n`);    
    fs.mkdirSync(wwwFolder);
  }

  console.log(`> Copying React distribution files\n`)

  ncp.limit = 16;
  
  ncp(`./react-app/build`, wwwFolder, function (err) {
   if (err) {
     return console.error(err);
   }
   console.log(`>React distribution files moved to ${wwwFolder}`);
  });
}

removeFolder().then(copyDistFiles);