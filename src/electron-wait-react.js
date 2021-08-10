const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
    client.end();
    if(!startedElectron) {
      console.log('starting electron');
      startedElectron = true;
      const exec = require('child_process').exec;
      var electron;
      if(process.platform == 'win32') {
        electron = exec('npm run electron');
      } else {
        electron = exec('npm run electron');
      }
      electron.stdout.on("data", function(data) {
        console.log(data.toString());
      });
      electron.on('close', function(code) {
        console.log('electron exited with code: ' + code);
        startedElectron = false;
        tryConnection();
      })
    }
  }
);

tryConnection();

client.on('error', (error) => {
  setTimeout(tryConnection, 1000);
});