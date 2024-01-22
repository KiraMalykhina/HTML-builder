const fs = require('fs');
const path = require('path');

const folderStylesPath = path.join(__dirname, 'styles');
const resultFilePath = path.join(__dirname, 'project-dist', 'bundle.css');
let result = [];

fs.readdir(folderStylesPath, { withFileTypes: true },  (err, files) => {
  if (err) {
    console.log(err);
  } else {
    fs.stat(resultFilePath, function(err) {
      if (!err) {
        fs.unlink(resultFilePath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
    });

    files.forEach(file => {
      const pathFile = path.join(__dirname, 'styles', file.name);
      if (file.isFile() === true && path.parse(pathFile).ext === '.css') {
        result.push(file.name);
         fs.readFile(pathFile,"utf-8", function(err, data) {
             if (err){
               throw err;
             }
           // resolt.push(data);
           // return resolt;
           //console.log(data);
           fs.appendFile(resultFilePath, data, (err) => err ? console.log(err) : null);
         });
      }
    });
  };
});
