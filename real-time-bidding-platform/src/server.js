const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bidSocket = require('./socket/bidsocket');
const app = require('./app');

const server = http.createServer(app);
const io = socketIo(server);

bidSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
