// src/api/controllers/goals.controller.js
const pool = require('../../config/db.config');

// Create a new goal
exports.createGoal = async (req, res) => {
    const { goal_type, target_value, start_date, end_date } = req.body;
    try {
        const newGoal = await pool.query(
            "INSERT INTO goals (user_id, goal_type, target_value, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [req.user.id, goal_type, target_value, start_date, end_date]
        );
        res.status(201).json(newGoal.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get all goals for the logged-in user
exports.getGoals = async (req, res) => {
    try {
        const goals = await pool.query("SELECT * FROM goals WHERE user_id = $1 ORDER BY start_date DESC", [req.user.id]);
        res.json(goals.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update a goal
exports.updateGoal = async (req, res) => {
    const { goal_type, target_value, start_date, end_date, status } = req.body;
    try {
        const updatedGoal = await pool.query(
            "UPDATE goals SET goal_type = $1, target_value = $2, start_date = $3, end_date = $4, status = $5, updated_at = NOW() WHERE id = $6 AND user_id = $7 RETURNING *",
            [goal_type, target_value, start_date, end_date, status, req.params.id, req.user.id]
        );
        if (updatedGoal.rows.length === 0) return res.status(404).json({ msg: 'Goal not found or user not authorized' });
        res.json(updatedGoal.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete a goal
exports.deleteGoal = async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM goals WHERE id = $1 AND user_id = $2", [req.params.id, req.user.id]);
        if (result.rowCount === 0) return res.status(404).json({ msg: 'Goal not found or user not authorized' });
        res.json({ msg: 'Goal deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};