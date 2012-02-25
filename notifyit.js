var io  = require('socket.io');

var http = require("http");
var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Notifyit is used to notify an activity to logged users in real time");
  response.end();
});

var socket = io.listen(server);
socket.sockets.on('connection', function (socket) {
  console.log('connection');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
server.listen(process.env.C9_PORT);