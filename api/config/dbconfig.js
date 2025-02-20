const mysql = require('mysql2');
require('dotenv').config({ path: __dirname + '/.env' });




// Create a pool of connections
const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
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
        connection.release(); 
    }
});

module.exports = pool.promise();

