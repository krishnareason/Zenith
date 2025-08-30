// src/api/controllers/trades.controller.js
const pool = require('../../config/db.config');

// Create a new trade
exports.createTrade = async (req, res) => {
  const {
    stock_name, direction, quantity, entry_price, exit_price,
    stop_loss, target_price, entry_timestamp, exit_timestamp,
    entry_reason, exit_reason, market_conditions, mistakes_made,
    final_view, strategy, commission = 0, fees = 0 
  } = req.body;

  // The user's ID is available from the auth middleware
  const userId = req.user.id;

  // Recalculate P&L on the backend to ensure data integrity
  const pnl = ((exit_price - entry_price) * quantity) - parseFloat(commission) - parseFloat(fees);

  try {
    const newTrade = await pool.query(
      `INSERT INTO trades (user_id, stock_name, direction, quantity, entry_price, exit_price, stop_loss, target_price, profit_loss, entry_timestamp, exit_timestamp, entry_reason, exit_reason, market_conditions, mistakes_made, final_view, strategy)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
       RETURNING *`,
      [userId, stock_name, direction, quantity, entry_price, exit_price, stop_loss, target_price, pnl, entry_timestamp, exit_timestamp, entry_reason, exit_reason, market_conditions, mistakes_made, final_view, strategy]
    );

    res.status(201).json(newTrade.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all trades for the logged-in user
exports.getTrades = async (req, res) => {
  try {
    const trades = await pool.query(
      "SELECT * FROM trades WHERE user_id = $1 ORDER BY entry_timestamp DESC",
      [req.user.id] // Get user id from the middleware
    );
    res.json(trades.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// --- NEW: Update a trade ---
exports.updateTrade = async (req, res) => {
  try {
    const tradeId = req.params.id;
    const userId = req.user.id;

    // 1. Fetch the trade to make sure it exists and belongs to the user
    const tradeResult = await pool.query("SELECT * FROM trades WHERE id = $1", [tradeId]);

    if (tradeResult.rows.length === 0) {
      return res.status(404).json({ message: "Trade not found" });
    }

    const trade = tradeResult.rows[0];
    if (trade.user_id !== userId) {
      return res.status(403).json({ message: "User not authorized to edit this trade" });
    }

    // 2. Update the trade with new values from the request body
    // We use the existing trade data as a fallback if a new value isn't provided
    const {
      stock_name = trade.stock_name,
      direction = trade.direction,
      quantity = trade.quantity,
      entry_price = trade.entry_price,
      exit_price = trade.exit_price,
      strategy = trade.strategy
      // ... add any other fields you want to be updatable
    } = req.body;

    // Recalculate profit_loss in case prices/quantity changed
    const pnl = (exit_price - entry_price) * quantity;

    const updatedTrade = await pool.query(
      `UPDATE trades SET stock_name = $1, strategy = $2, profit_loss = $3, updated_at = NOW()
       WHERE id = $4 RETURNING *`,
      [stock_name, strategy, pnl, tradeId]
    );

    res.json(updatedTrade.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// --- NEW: Delete a trade ---
exports.deleteTrade = async (req, res) => {
  try {
    const tradeId = req.params.id;
    const userId = req.user.id;

    // 1. Fetch the trade to verify ownership before deleting
    const tradeResult = await pool.query("SELECT user_id FROM trades WHERE id = $1", [tradeId]);

    if (tradeResult.rows.length === 0) {
      return res.status(404).json({ message: "Trade not found" });
    }

    if (tradeResult.rows[0].user_id !== userId) {
      return res.status(403).json({ message: "User not authorized to delete this trade" });
    }

    // 2. Delete the trade
    await pool.query("DELETE FROM trades WHERE id = $1", [tradeId]);

    res.json({ message: "Trade deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};