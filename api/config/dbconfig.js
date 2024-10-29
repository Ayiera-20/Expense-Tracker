const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL || 
        `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME}`,
        ssl: {
            rejectUnauthorized: false 
        }
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
