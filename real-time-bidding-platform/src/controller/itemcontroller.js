const { getAllItems, getItemById, createItem, updateItem, deleteItem } = require('../models/itemModel');

exports.getItems = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const items = await getAllItems(limit, offset);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await getItemById(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createItem = async (req, res) => {
  const { name, description, starting_price, image_url, end_time } = req.body;
  try {
    const item = await createItem(name, description, starting_price, image_url, end_time);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, starting_price, image_url, end_time } = req.body;
  try {
    const item = await updateItem(id, name, description, starting_price, image_url, end_time);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteItem(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
