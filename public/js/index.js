const socket = io();

socket.on('connect', function () {
  console.log('connected to server');

  socket.emit('createMessage', {
    to: 'jen',
    text: 'hi, new email',
  });
});

socket.on('disconnect', function () {
  console.log('disconnecting from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});