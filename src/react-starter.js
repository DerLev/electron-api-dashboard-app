const net = require('net');

const client = new net.Socket();

let startedReact = false;
const startReact =  () => {
  client.end();
  if(!startedReact) {
    console.log('starting react');
    startedReact = true;
    const exec = require('child_process').exec;
    var react;
    if(process.platform == 'win32') {
      react = exec('npm run react:win');
    } else {
      react = exec('npm run react');
    }
    react.stdout.on("data", function(data) {
      console.log(data.toString());
    });
  }
}

startReact();

client.on('error', (error) => {
  setTimeout(startReact(), 1000);
});