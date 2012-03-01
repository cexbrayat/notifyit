var io  = require('socket.io');
var http = require("http");

var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Notifyit is used to notify an activity to logged users in real time");
  var fullBody = '';
  request.on("data", function(postDataChunk) {
      console.log("Received POST data chunk '" + postDataChunk + "'.");
      fullBody += postDataChunk;
  });
  request.on('end', function() {
      var postData = JSON.parse(fullBody);
      console.log("users interested '" + postData.users + "'.");
      console.log('connecteds ' + connecteds);
      var socket = connecteds["cedric"];
      console.log("socket : " + socket);
      if(socket != undefined){
      	socket.emit('activity', { data: postData.content });
      }
    });
  response.end();
});

var connecteds = {};

var socket = io.listen(server);
socket.sockets.on('connection', function (socket) {
  console.log('client');
  socket.on('user', function (user) {
    console.log('user ' + user.name);
	delete connecteds[user.name];
    connecteds[user.name] = socket;
    console.log('connecteds ' + connecteds);
  });
});

//server.listen(process.env.C9_PORT);
server.listen(9002);
