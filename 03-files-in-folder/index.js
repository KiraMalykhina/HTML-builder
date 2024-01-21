const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'secret-folder');
// console.log(filePath);
  
fs.readdir(filePath, { withFileTypes: true },  (err, files) => { 
  if (err) 
    console.log(err); 
  else { 
    // console.log("\nCurrent directory filenames:"); 
    files.forEach(file => {
      const pathFile = path.join(__dirname, 'secret-folder', file.name);
      // console.log(pathFile);
      if (file.isFile() === true) {
        fs.stat(pathFile, (err, stats) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`${path.parse(pathFile).name} -${path.parse(pathFile).ext} - ${stats.size}`); 
        });
      }
    }) 
  } 
}) 