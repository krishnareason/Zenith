// src/api/controllers/notes.controller.js
const pool = require('../../config/db.config');

exports.createNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        const newNote = await pool.query(
            "INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
            [req.user.id, title, content]
        );
        res.status(201).json(newNote.rows[0]);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getNotes = async (req, res) => {
    try {
        const notes = await pool.query("SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC", [req.user.id]);
        res.json(notes.rows);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.updateNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        const updatedNote = await pool.query(
            "UPDATE notes SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 AND user_id = $4 RETURNING *",
            [title, content, req.params.id, req.user.id]
        );
        if (updatedNote.rows.length === 0) return res.status(404).json({ msg: 'Note not found or user not authorized' });
        res.json(updatedNote.rows[0]);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM notes WHERE id = $1 AND user_id = $2", [req.params.id, req.user.id]);
        if (result.rowCount === 0) return res.status(404).json({ msg: 'Note not found or user not authorized' });
        res.json({ msg: 'Note deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};