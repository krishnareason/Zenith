// src/api/routes/auth.routes.js
const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// POST /api/auth/register
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please enter a valid email.'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
  ],
  authController.register
);

// --- NEW: Add the login route ---
// POST /api/auth/login
router.post('/login', authController.login);


module.exports = router;