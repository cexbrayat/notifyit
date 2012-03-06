var io  = require('socket.io');
var http = require('http');

var server = http.createServer(function(request, response) {
  //sur la reception d'une requete http
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Notifyit is used to notify an activity to logged users in real time");

  //on recupere les données en post
  var fullBody = '';
  request.on("data", function(postDataChunk) {
    fullBody += postDataChunk;
  });

  //quand toutes les données sont recuperees
  request.on('end', function() {
    if(fullBody !== ''){
      var postData = JSON.parse(fullBody);

      //on recupere les users interesses par la notif
      console.log("users interested '" + postData.users + "'.");

      for(var user in postData.users){
        //on recupere la socket associee
        var socket = connecteds[postData.users[user]];
        //si le user est connecte, alors on envoie le message
        if(socket !== undefined){
          console.log('activity sent to ' + postData.users[user]);
          socket.emit('activity', { data: postData.content });
        }
      }
    }
  });

  response.end();
});

//liste des users connectes
var connecteds = {};

//websocket
var websocket = io.listen(server);
//a la connexion
websocket.sockets.on('connection', function (socket) {
  console.log('client');

  socket.on('user', function (user) {
    //on stocke le login du user
    console.log('user ' + user.name);
    delete connecteds[user.name];
    connecteds[user.name] = socket;
  });
});

//server.listen(process.env.C9_PORT);
var port =  process.env.PORT || 9002;
server.listen(port, function() {
  console.log("Listening on " + port);
});
