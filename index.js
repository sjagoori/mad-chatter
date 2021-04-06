const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);

app.use(express.static(path.resolve('public')));

io.on('connection', (socket) => {
  console.log('user connected')
  socket.on('disconnect', () => {
    console.log('disconnected');
  })
})

http.listen(port, () => {
  console.log(`listening to port ${port}`);
})