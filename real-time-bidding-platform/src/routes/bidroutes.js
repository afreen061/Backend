const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/items/:itemId/bids', bidController.getBids);
router.post('/items/:itemId/bids', authMiddleware, bidController.placeBid);

module.exports = router;
