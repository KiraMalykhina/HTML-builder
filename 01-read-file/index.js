const fs = require('fs');
const path = require('path');
const resolt = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
resolt.on('data', data => console.log(data));