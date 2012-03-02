var should = require('should');
var http = require('http');
var io = require('socket.io-client');
var querystring = require('querystring');

var socketURL = 'http://localhost:9002';
var options ={
  transports: ['websocket'],
  'force new connection': true
};
var httpOptions = {  
  host: 'localhost',   
  port: 9002,     
  method: 'POST'
};

// ../node_modules/expresso/bin/expresso notifyit-test.js

var request = function(content, users){
  var req = http.request(httpOptions, function(res) {       
    res.statusCode.should.eql(200);
    res.on('data', function(chunk) {  
      chunk.toString().should.eql('Notifyit is used to notify an activity to logged users in real time');   
    });   
  });   
  req.write(JSON.stringify({'content': content, 'users': users}));
  req.end();
}

module.exports = {

  "cedric is connected and get a notification": function () {
    //cedric se connecte
  	var cedric = io.connect(socketURL, options);
    cedric.on('connect',function(data){
      cedric.emit('user', {name: 'cedric'}); 
      //on lance une notification
      request('<div>some html for me</div>', ['cedric']);
    });

    //et doit recevoir une notification par websocket avec le contenu envoye
    cedric.on('activity', function(activity){
      activity.data.should.eql('<div>some html for me</div>');
      // et se deconnecte
      cedric.disconnect();
    });
 
  },

  "cedric is connected and should not get cyril's notification": function () {
    //cedric se connecte
    var cedric = io.connect(socketURL, options);
    cedric.on('connect',function(data){
      cedric.emit('user', {name: 'cedric'}); 
    });

    //cedric ne doit pas recevoir de notification
    cedric.on('activity', function(activity){
      should.fail('cedric ne doit pas recevoir de notif et a reçu ' + activity.data);
    });

    //cyril se connecte
    var cyril = io.connect(socketURL, options);
    cyril.on('connect',function(data){
      cyril.emit('user', {name: 'cyril'}); 
      //une notification est adressee a cyril
      request('<div>some html for cyril</div>', ['cyril']);
    });

    //et doit recevoir une notification par websocket avec le contenu envoye
    cyril.on('activity', function(activity){
      activity.data.should.eql('<div>some html for cyril</div>');
      // et se deconnecte
      cyril.disconnect();
      cedric.disconnect();
    });
  }
}
