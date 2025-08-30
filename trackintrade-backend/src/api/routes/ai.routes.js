// src/api/routes/ai.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const aiController = require('../controllers/ai.controller');

// This route will be protected, only logged-in users can access it
router.get('/insights', authMiddleware, aiController.getInsights);

module.exports = router;