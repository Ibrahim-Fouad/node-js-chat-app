const express = require('express');
const http = require("http");
const config = require('../config/config');
const socketIO = require('socket.io');
const app = express();

let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('createMessage', (message) => {
        console.log('Create message event emited', message);
        io.emit('newMessage', {message: 'Hello 2'});
    });

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
});



app.use(express.static(config.PublicPath));



server.listen(config.Port, (err) => {
    if(err) return console.log(err);

    console.log(`Listening on port ${config.Port}`);
});