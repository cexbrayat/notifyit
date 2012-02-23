var io  = require('socket.io');

var http = require("http");
var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Notifyit is used to notify an activity to logged users in real time");
  response.end();
});

var socket = io.listen(server);
socket.on('connection', function(client){});
server.listen(process.env.C9_PORT);