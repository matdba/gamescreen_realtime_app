const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var app = express();
var port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.get('/', (req, res) => {
  res.send("blah");
});

io.on('connection', (socket) => {
  console.log('user is connected');

  socket.on('join', () => {
    io.emit('newUserJoined', "this is from the server");
  });

  socket.on('moveAction', (move) => {
    io.emit('getUserMove', move);
  });

});

server.listen(port, () => {
  console.log('Server is running on port 3000');
});
