# Notifyit

[![Build Status](https://secure.travis-ci.org/cexbrayat/notifyit.png)](http://travis-ci.org/cexbrayat/notifyit)

## Purpose

Notifyit is used to notify an activity to logged users in real time.  

## To launch  
```
npm install socket.io  
node notifyit.js  
```

I recommend the use of nodemon to relaunch on save  
```
npm install nodemon  
nodemon notifyit.js  
```

## To test

With a running instance of the server
```
npm install expresso  
npm install should  
npm install socket.io-client   
../node_modules/expresso/bin/expresso notifyit-test.js  
```
