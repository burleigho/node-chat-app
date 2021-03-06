const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;
const {generateMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message)
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('This is from the server');
  });

  socket.on('disconnect', () => {
    console.log('user was disconnected');
  });
});

server.listen(port, () => {
  console.log(`App is started on port ${port}`);
});


