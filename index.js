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
    socket.broadcast.emit('message', messageText);
  });

  socket.on('typing', (status) => {
    socket.broadcast.emit('typing', status);
  });

  socket.on('refresh', () => {
    socket.broadcast.emit('refresh');
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

http.listen(port, () => {
  console.log(`listening to port ${port}`);
});
