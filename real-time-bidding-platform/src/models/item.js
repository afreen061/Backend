const pool = require('../config/db');

const getAllItems = async (limit, offset) => {
  const result = await pool.query('SELECT * FROM items LIMIT $1 OFFSET $2', [limit, offset]);
  return result.rows;
};

const getItemById = async (id) => {
  const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
  return result.rows[0];
};

const createItem = async (name, description, starting_price, image_url, end_time) => {
  const result = await pool.query(
    'INSERT INTO items (name, description, starting_price, image_url, end_time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, description, starting_price, image_url, end_time]
  );
  return result.rows[0];
};

const updateItem = async (id, name, description, starting_price, image_url, end_time) => {
  const result = await pool.query(
    'UPDATE items SET name = $1, description = $2, starting_price = $3, image_url = $4, end_time = $5 WHERE id = $6 RETURNING *',
    [name, description, starting_price, image_url, end_time, id]
  );
  return result.rows[0];
};

const deleteItem = async (id) => {
  await pool.query('DELETE FROM items WHERE id = $1', [id]);
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
