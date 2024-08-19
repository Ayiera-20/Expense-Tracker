// const mysql = require('mysql2');
// const dotenv = require('dotenv');

// dotenv.config();

// // Connecting to the database
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME, 
//     multipleStatements: true 
//     // waitForConnections: true,
//     // connectionLimit: 10,     
//     // queueLimit: 0
// });


// // Test connection
// connection.connect((err) => {
//     if (err) {
//         return console.log("Error connecting to MySQL:", err.message);
//     }
//     console.log("Connected to MySQL as id:", connection.threadId);
// });

// // module.exports = pool.promise();  
// module.exports = connection;


const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Create a pool of connections
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
    waitForConnections: true,
    connectionLimit: 10,     
    queueLimit: 0
});

// Test connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to MySQL:", err.message);
    } else {
        console.log("Connected to MySQL as id:", connection.threadId);
        connection.release(); // Release the connection back to the pool
    }
});

// Export the pool with promises for async/await support
module.exports = pool.promise();