// src/api/routes/goals.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const goalsController = require('../controllers/goals.controller');

// All routes are protected by the auth middleware
router.post('/', authMiddleware, goalsController.createGoal);
router.get('/', authMiddleware, goalsController.getGoals);
router.put('/:id', authMiddleware, goalsController.updateGoal);
router.delete('/:id', authMiddleware, goalsController.deleteGoal);

module.exports = router;