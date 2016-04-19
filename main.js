const http = require('http');
const fs = require('fs');
const port = 1337;

const app = http.createServer((request, response) => {
  fs.readFile('client.html', 'utf-8', (error, data) => {
    response.writeHead(200, {
      'Content-Type': 'text/html',
    });
    response.write(data);
    response.end();
  });
}).listen(port);

const io = require('socket.io').listen(app);

io.sockets.on('connection', (socket) => {
  socket.on('valentine_message_to_server', (data) => {
    io.sockets.emit('valentine_message_to_client', {
      message: data.message,
    });
  });
});

console.log('Server is listening to : ' + port);
