// const http = require('http');
//
// const hostname = '127.0.0.1';
// const port = 3000;
//
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });
//
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
var binaryServer = require('binaryjs').BinaryServer;
var wav = require('wav');

var server = binaryServer({port: 9001});

server.on('connection', function(client) {
    var fileWriter = null;

    client.on('stream', function(stream, meta) {
      var fileWriter = new wav.FileWriter('demo.wav', {
        channels: 1,
        sampleRate: 16000,
        bitDepth: 16
      });
      stream.pipe(fileWriter);
      stream.on('end', function() {
        fileWriter.end();
      });
    });

    client.on('close', function() {
      if (fileWriter != null) {
        fileWriter.end();
      }
    });
});
