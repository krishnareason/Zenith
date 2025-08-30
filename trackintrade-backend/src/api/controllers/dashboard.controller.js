// src/api/controllers/dashboard.controller.js
const pool = require('../../config/db.config');

exports.getSummary = async (req, res) => {
  const userId = req.user.id;

  try {
    // This single, powerful query calculates all our summary stats at once.
    const summaryQuery = `
      WITH UserTrades AS (
        SELECT
          profit_loss
        FROM
          trades
        WHERE
          user_id = $1
      )
      SELECT
        SUM(profit_loss) AS total_pnl,
        COUNT(*) AS total_trades,
        COUNT(CASE WHEN profit_loss > 0 THEN 1 END) AS profitable_trades,
        -- Calculate Win Rate, avoiding division by zero if there are no trades
        CASE
          WHEN COUNT(*) > 0 THEN (COUNT(CASE WHEN profit_loss > 0 THEN 1 END) * 100.0 / COUNT(*))
          ELSE 0
        END AS win_rate
      FROM
        UserTrades;
    `;

    const summaryResult = await pool.query(summaryQuery, [userId]);

    // Note: We will add 'best_day' logic in a later step to keep this focused.
    // For now, we return the core financial stats.
    const summaryData = {
      total_pnl: parseFloat(summaryResult.rows[0].total_pnl) || 0,
      total_trades: parseInt(summaryResult.rows[0].total_trades) || 0,
      profitable_trades: parseInt(summaryResult.rows[0].profitable_trades) || 0,
      win_rate: parseFloat(summaryResult.rows[0].win_rate) || 0,
    };

    res.json(summaryData);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getPnlByDay = async (req, res) => {
  const userId = req.user.id;

  try {
    // This query groups trades by the day of the week and sums the P&L.
    // - EXTRACT(DOW FROM exit_timestamp) gets the day as a number (0=Sun, 1=Mon...). We use this for sorting.
    // - TO_CHAR(exit_timestamp, 'Day') gets the day's full name (e.g., 'Monday ').
    const pnlByDayQuery = `
      SELECT
        TRIM(TO_CHAR(exit_timestamp, 'Day')) AS day,
        EXTRACT(DOW FROM exit_timestamp) AS day_of_week,
        SUM(profit_loss) AS total_pnl
      FROM
        trades
      WHERE
        user_id = $1
      GROUP BY
        day, day_of_week
      ORDER BY
        day_of_week;
    `;

    const result = await pool.query(pnlByDayQuery, [userId]);

    // Format the data to match our API plan
    const formattedData = result.rows.map(row => ({
        day: row.day,
        pnl: parseFloat(row.total_pnl)
    }));

    res.json(formattedData);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getPnlByMonth = async (req, res) => {
  const userId = req.user.id;

  try {
    // This query groups trades by year and month.
    // - EXTRACT(YEAR...) and EXTRACT(MONTH...) are for sorting.
    // - TO_CHAR(..., 'Mon') gets the abbreviated month name (e.g., 'Aug').
    const pnlByMonthQuery = `
      SELECT
        EXTRACT(YEAR FROM exit_timestamp) AS year,
        EXTRACT(MONTH FROM exit_timestamp) AS month_number,
        TO_CHAR(exit_timestamp, 'Mon') AS month,
        SUM(profit_loss) AS total_pnl
      FROM
        trades
      WHERE
        user_id = $1
      GROUP BY
        year, month_number, month
      ORDER BY
        year, month_number;
    `;

    const result = await pool.query(pnlByMonthQuery, [userId]);

    const formattedData = result.rows.map(row => ({
      year: parseInt(row.year),
      month: row.month.trim(), // .trim() removes any extra whitespace
      pnl: parseFloat(row.total_pnl)
    }));

    res.json(formattedData);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getPnlOverTime = async (req, res) => {
  const userId = req.user.id;
  try {
    // This query uses a "window function" (SUM(...) OVER (...))
    // to calculate the cumulative sum (running total) of P&L,
    // ordered by the exit date of each trade.
    const result = await pool.query(
      `SELECT
        exit_timestamp::date AS date,
        SUM(profit_loss) OVER (ORDER BY exit_timestamp ASC) AS "cumulativePnl"
      FROM trades
      WHERE user_id = $1
      ORDER BY exit_timestamp ASC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// --- NEW: Profit by Strategy ---
exports.getPnlByStrategy = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      `SELECT
        strategy,
        SUM(profit_loss) AS "totalPnl"
      FROM trades
      WHERE user_id = $1 AND strategy IS NOT NULL AND strategy != ''
      GROUP BY strategy
      ORDER BY "totalPnl" DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};