const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'files');
const filePathCopy = path.join(__dirname, 'files-copy');
// console.log(filePath);
fs.mkdir(filePathCopy,
    { recursive: true },
    (err) => {
        if (err) {
            return console.error(err);
        }
});

fs.readdir(filePath, (err, files) => { 
  if (err) {
    console.log(err); 
  }
  else { 
    files.forEach(file => {
      // console.log(path.join(filePath, file));
      fs.copyFile(path.join(filePath, file), path.join(filePathCopy, file), (err) => {
        if (err) {
            console.log("Error Found:", err);
        }
      });
    }) 
  } 
}) 