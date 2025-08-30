// src/api/routes/dashboard.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const dashboardController = require('../controllers/dashboard.controller');

router.get('/summary', authMiddleware, dashboardController.getSummary);
router.get('/pnl-by-day', authMiddleware, dashboardController.getPnlByDay);
router.get('/pnl-by-month', authMiddleware, dashboardController.getPnlByMonth);

// --- NEW ROUTES ---
router.get('/pnl-over-time', authMiddleware, dashboardController.getPnlOverTime);
router.get('/profit-by-strategy', authMiddleware, dashboardController.getPnlByStrategy);

module.exports = router;