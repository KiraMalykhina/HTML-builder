const { stdin, stdout } = process;
const fs = require("fs");
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath);

stdout.write("Введите Ваш текст:\n");

stdin.on("data", (data) => {
  const dataStringified = data.toString();

  if (dataStringified.trim() == 'exit') {
    process.exit();
  }

  writeStream.write(dataStringified, err => { err ? console.log(err) : null; });
});

process.on("SIGINT", () => {
    process.exit();
});

process.on("exit", () => stdout.write("Goodbye!"));






