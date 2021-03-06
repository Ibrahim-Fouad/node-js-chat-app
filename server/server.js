const express = require('express');
const http = require("http");
const config = require('../config/config');
const socketIO = require('socket.io');
const app = express();
const { generateMessage, generateLocationMessage } = require('./utils/message');


let server = http.createServer(app);
let io = socketIO(server);

let username = '';

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'));

    socket.on('createMessage', (message) => {
        console.log('Create message event emited', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('createLocationMessage', (data) => {
        console.log('User send location', data);
        io.emit('newLocationMessage', generateLocationMessage(data.from, data.latitude, data.longtuide));
    });

    socket.on('disconnect', () => {

    });
});



app.use(express.static(config.PublicPath));



server.listen(config.Port, (err) => {
    if (err) return console.log(err);

    console.log(`Listening on port ${config.Port}`);
});