// src/api/routes/notes.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const notesController = require('../controllers/notes.controller');

router.post('/', authMiddleware, notesController.createNote);
router.get('/', authMiddleware, notesController.getNotes);
router.put('/:id', authMiddleware, notesController.updateNote);
router.delete('/:id', authMiddleware, notesController.deleteNote);

module.exports = router;