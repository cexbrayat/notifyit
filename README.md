Notifyit is used to notify an activity to logged users in real time.

To launch :
npm install socket.io
node notifyit.js

I recommend the use of nodemon to relaunch on save
nodemon notifyit.js

To launch unit tests (with a running instance of the server)
npm install should
npm install socket.io-client
../node_modules/expresso/bin/expresso notifyit-test.js
