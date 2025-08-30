const { Pool } = require('pg');

// Create a new pool instance.
// The 'pg' library will automatically use the DATABASE_URL from the .env file.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Export the pool object so we can use it in other parts of our application
module.exports = pool;