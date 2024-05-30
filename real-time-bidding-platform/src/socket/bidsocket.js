const { createBid } = require('../models/bidmodel');
const pool = require('../config/db');

const bidSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('bid', async (data) => {
      const { itemId, userId, bidAmount } = data;
      try {
        const newBid = await createBid(itemId, userId, bidAmount);
        await pool.query('UPDATE items SET current_price = $1 WHERE id = $2', [bidAmount, itemId]);
        io.emit('update', newBid);
      } catch (error) {
        socket.emit('error', error.message);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

module.exports = bidSocket;
