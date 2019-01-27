var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

//Server setup
server.listen(process.env.PORT || 3000 , function () {
  console.log('Server is up!');
});

//Static files
app.use(express.static('public'));

//Socket setup
io.sockets.on('connection', function (socket) {
  connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length);

  //Handle chat event
  socket.on('chat', function (data) {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });
});
