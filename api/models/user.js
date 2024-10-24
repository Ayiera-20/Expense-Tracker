
// const db = require('../config/dbconfig');

// const User = {
//     // Create a user with promises (no callback)
//     create: async (userData) => {
//         const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
//         const [result] = await db.query(sql, [userData.username, userData.email, userData.password]);
//         return result;
//     },
    
//     // Find user by username or email with promises
//     findByUsernameOrEmail: async (identifier) => {
//         const sql = 'SELECT * FROM users WHERE username = ? OR email = ?';
//         const [rows] = await db.query(sql, [identifier, identifier]);
//         return rows[0]; // Return the first row if found, otherwise undefined
//     }
// };

// module.exports = User;

const User = {
    create: async (userData) => {
        try {
            const sql = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
            const [result] = await db.query(sql, [userData.username, userData.email, userData.password]);
            return result;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },
 
    findByUsernameOrEmail: async (identifier) => {
        try {
            const sql = 'SELECT * FROM users WHERE username = $1 OR email = $2';
            const [rows] = await db.query(sql, [identifier, identifier]);
            return rows[0]; // Return the first row if found, otherwise undefined
        } catch (error) {
            console.error('Error finding user:', error);
            throw error;
        }
    }
};
