const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const upload = require('../utils/fileUpload');

router.get('/', itemController.getItems);
router.get('/:id', itemController.getItem);
router.post('/', authMiddleware, roleMiddleware(['admin', 'user']), upload.single('image'), itemController.createItem);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'user']), upload.single('image'), itemController.updateItem);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), itemController.deleteItem);

module.exports = router;
