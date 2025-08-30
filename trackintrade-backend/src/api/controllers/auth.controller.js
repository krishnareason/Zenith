// src/api/controllers/auth.controller.js
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // <-- Make sure this is added
const pool = require('../../config/db.config');

// In auth.controller.js
exports.register = async (req, res) => {
  // ... (validation code is the same)
  const { name, email, password } = req.body;
  try {
    // ... (user exists check is the same)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // --- NEW DEBUG LOG ---
    console.log('[DEBUG] Hashed password during registration:', passwordHash);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, user_type",
      [name, email, passwordHash]
    );
    res.status(201).json({ message: "User registered successfully!", user: newUser.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// --- NEW: Add the entire login function ---
// In auth.controller.js
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const user = userResult.rows[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const payload = {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                user_type: user.user_type
            }
        };

        // --- THIS IS THE CORRECTED CODE ---
        // The jwt.sign function is synchronous if we don't provide a callback.
        // This is more reliable and avoids the hanging issue.
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: "Login successful!",
            token: token
        });
        // --- END OF CORRECTED CODE ---

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};