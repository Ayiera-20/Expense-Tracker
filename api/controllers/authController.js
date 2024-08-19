const bcrypt = require('bcrypt');
const User = require('../models/user');

const authController = {
    // Register method
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Use async/await for User.create
            await User.create({ username, email, password: hashedPassword });
    
            // Respond with 201 status and JSON message
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error registering new user:', error);
    
            // Return error details in JSON format
            res.status(400).json({ message: 'Error registering new user', error });
        }
    },
    
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
    
            // Fetch user by username or email
            const user = await User.findByUsernameOrEmail(username);
            if (!user) {
                // Respond with a JSON object for errors
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Compare password using bcrypt
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                req.session.userId = user.id;
                // Respond with success message in JSON
                res.json({ message: 'Logged in successfully' });
            } else {
                // Respond with a JSON object for errors
                res.status(400).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Error logging in user:', error);
            // Respond with a JSON object for server errors
            res.status(500).json({ message: 'Error logging in user', error });
        }
    }
    
};

module.exports = authController;
