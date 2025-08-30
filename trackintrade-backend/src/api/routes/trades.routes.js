// src/api/routes/trades.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const tradeController = require('../controllers/trades.controller');

// @route   POST api/trades
// @desc    Create a new trade
// @access  Private
router.post('/', authMiddleware, tradeController.createTrade);

// @route   GET api/trades
// @desc    Get all trades for a user
// @access  Private
router.get('/', authMiddleware, tradeController.getTrades);

// --- NEW: Update a trade route ---
// @route   PUT api/trades/:id
// @desc    Update a trade
// @access  Private
router.put('/:id', authMiddleware, tradeController.updateTrade);

// --- NEW: Delete a trade route ---
// @route   DELETE api/trades/:id
// @desc    Delete a trade
// @access  Private
router.delete('/:id', authMiddleware, tradeController.deleteTrade);


module.exports = router;