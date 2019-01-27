var express = require('express'),
    http = require('http');

//App setup
var app = express();
var server = http.createServer(app);
server.listen(process.env.PORT || 4000 , function () {
  console.log('Server is up!');
});

//Static files
app.use(express.static('public'));

//Socket setup
var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
  console.log('socket connection', socket.id);

  //Handle chat event
  socket.on('chat', function (data) {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });
});
