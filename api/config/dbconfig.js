const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,  // Ensure this is defined in your .env file
});

// Test the PostgreSQL connection
pool.connect((err) => {
    if (err) {
        console.error("Error connecting to PostgreSQL", err);
    } else {
        console.log("Connected to PostgreSQL successfully!");
    }
});

// Export the pool to be used in other files
module.exports = pool;
