var fs = require('fs');

function readWriteSync() {
    var data = fs.readFileSync('./src/config/config.ts', 'utf-8');
    var newValue = data.replace('json.local', 'json.prod');
    fs.writeFileSync('./src/config/config.ts', newValue, 'utf-8');
    console.log('CONFIG REWRITTEN FOR PROD');
  }
  
  readWriteSync();