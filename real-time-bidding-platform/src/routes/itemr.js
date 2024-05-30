const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', itemController.getItems);
router.get('/:id', itemController.getItem);
router.post('/', authMiddleware, roleMiddleware(['admin', 'user']), itemController.createItem);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'user']), itemController.updateItem);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), itemController.deleteItem);

module.exports = router;
