const fs = require('fs');
const path = require('path');

const index = path.basename(__filename);
const files = fs.readdirSync(__dirname);

for (let file of files) {
  if (file !== index) {
    const name = path.basename(file, '.js');
    module.exports[name] = require(`./${file}`);
  }
}
