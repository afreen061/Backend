const { getBidsByItemId, createBid } = require('../models/bidmodel');
const pool = require('../config/db');

exports.getBids = async (req, res) => {
  const { itemId } = req.params;
  try {
    const bids = await getBidsByItemId(itemId);
    res.json(bids);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.placeBid = async (req, res) => {
  const { itemId } = req.params;
  const { bid_amount } = req.body;
  const user_id = req.user.id;
  try {
    const newBid = await createBid(itemId, user_id, bid_amount);
    await pool.query('UPDATE items SET current_price = $1 WHERE id = $2', [bid_amount, itemId]);
    res.status(201).json(newBid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
