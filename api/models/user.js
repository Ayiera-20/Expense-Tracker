const db = require('../config/dbconfig');

const User = {
    create: async (userData) => {
        try {
            const sql = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
            const result = await db.query(sql, [userData.username, userData.email, userData.password]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    findByUsernameOrEmail: async (identifier) => {
        try {
            const sql = 'SELECT * FROM users WHERE username = $1 OR email = $2';
            const result = await db.query(sql, [identifier, identifier]);
            return result.rows[0]; 
        } catch (error) {
            console.error('Error finding user:', error);
            throw error;
        }
    }
};

module.exports = User;
