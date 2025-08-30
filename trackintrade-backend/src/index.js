require('dotenv').config();
const express = require('express');
// We have removed the 'cors' package import
const pool = require('./config/db.config');

const authRoutes = require('./api/routes/auth.routes');
const tradeRoutes = require('./api/routes/trades.routes');
const dashboardRoutes = require('./api/routes/dashboard.routes');
const noteRoutes = require('./api/routes/notes.routes');
const aiRoutes = require('./api/routes/ai.routes');
const goalRoutes = require('./api/routes/goals.routes');

const app = express();
const PORT = 3000;

// (The testDbConnection function should be here)
async function testDbConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log(`Database connected successfully at: ${result.rows[0].now}`);
  } catch (err) {
    console.error('Database connection failed!', err.stack);
    process.exit(1);
  }
}

// --- MIDDLEWARES ---

// --- NEW: Manual CORS Handling Middleware ---
app.use((req, res, next) => {
  // Allow requests from our frontend development server
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  // Allow these HTTP methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // Allow these headers in the request
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // If the incoming request is an OPTIONS request (the preflight),
  // we just send a 200 OK status and end the response.
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  // Otherwise, continue to the next middleware or route handler.
  next();
});

// This middleware is for parsing JSON bodies
app.use(express.json());


// --- API ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/trades', tradeRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/goals', goalRoutes);

app.get('/', (req, res) => {
  res.json({ message: "Welcome to the TrackInTrade API! 🚀" });
});

app.listen(PORT, '127.0.0.1', async () => {
  await testDbConnection();
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});