const fs = require("fs");
const fsPromises = require('node:fs/promises');
const path = require('path');

let template;
let header;
let articles;
let footer;

async function runProgramm() {
  template = await readFile(path.join(__dirname, 'template.html'));
  header = await readFile(path.join(__dirname, 'components', 'header.html'));
  articles = await readFile(path.join(__dirname, 'components', 'articles.html'));
  footer = await readFile(path.join(__dirname, 'components', 'footer.html'));

  await writeTemplateFile();

  handleStyles();
  handleAssets();
};
runProgramm();

async function readFile(filePath) {
  const data = await fsPromises.readFile(filePath, {
    encoding: 'utf8'
  });
  return data;
};

async function writeTemplateFile() {
  template = template.replace('{{header}}', header);
  template = template.replace('{{articles}}', articles);
  template = template.replace('{{footer}}', footer);

  const projectDistPath = path.join(__dirname, 'project-dist');
  fs.mkdir(projectDistPath, {
      recursive: true
    },
    (err) => {
      if (err) {
        return console.error(err);
      }
    });
  const filePath = path.join(projectDistPath, 'index.html');
  const writeStream = fs.createWriteStream(filePath);
  writeStream.write(template, err => {
    err ? console.log(err) : null;
  });
};

function handleStyles() {
  const folderStylesPath = path.join(__dirname, 'styles');
  const resultFilePath = path.join(__dirname, 'project-dist', 'style.css');
  let result = [];

  fs.readdir(folderStylesPath, {
    withFileTypes: true
  }, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      fs.stat(resultFilePath, function (err) {
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
          fs.readFile(pathFile, "utf-8", function (err, data) {
            if (err) {
              throw err;
            }
            fs.appendFile(resultFilePath, data, (err) => err ? console.log(err) : null);
          });
        }
      });
    };
  });
};

function handleAssets() {
  const assestPath = path.join(__dirname, 'assets');
  const assestCopyPath = path.join(__dirname, 'project-dist', 'assets');
  fs.mkdir(assestCopyPath, {
      recursive: true
    },
    (err) => {
      if (err) {
        return console.error(err);
      }
    });

  fs.readdir(path.join(assestPath), (err, folder) => {
    if (err) {
      console.log(err);
    } else {
      folder.forEach(folder1 => {
        fs.mkdir(path.join(assestCopyPath, folder1), {
            recursive: true
          },
          (err) => {
            if (err) {
              return console.error(err);
            }
          })
        fs.readdir(path.join(assestPath, folder1), (err, files) => {
          if (err) {
            console.log(err);
          } else {
            files.forEach(file => {
              // console.log(path.join(filePath, file));
              fs.copyFile(path.join(assestPath, folder1, file), path.join(assestCopyPath, folder1, file), (err) => {
                if (err) {
                  console.log("Error Found:", err);
                }
              });
            })
          }
        });
      })
    }
  })
};