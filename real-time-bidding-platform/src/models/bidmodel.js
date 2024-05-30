const pool = require('../config/db');

const getBidsByItemId = async (itemId) => {
  const result = await pool.query('SELECT * FROM bids WHERE item_id = $1', [itemId]);
  return result.rows;
};

const createBid = async (item_id, user_id, bid_amount) => {
  const result = await pool.query(
    'INSERT INTO bids (item_id, user_id, bid_amount) VALUES ($1, $2, $3) RETURNING *',
    [item_id, user_id, bid_amount]
  );
  return result.rows[0];
};

module.exports = {
  getBidsByItemId,
  createBid,
};
