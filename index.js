const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);
const port = process.env.PORT || 4000;

app.use(express.static(path.resolve('public')));

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('message', (messageText) => {
    console.log('message is: ', messageText);
  });

  socket.on('typing', (status) => {
    socket.emit('typing', status);
    console.log('typing: \t', status);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

http.listen(port, () => {
  console.log(`listening to port ${port}`);
});
