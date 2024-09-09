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
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error registering new user:', error);
            res.status(400).json({ message: 'Error registering new user', error });
        }
    },
    
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
    
            // Fetch user by username or email
            const user = await User.findByUsernameOrEmail(username);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }   
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                req.session.userId = user.id;
                res.json({ message: 'Logged in successfully' });
            } else {
                res.status(400).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ message: 'Error logging in user', error });
        }
    }
    
};

module.exports = authController;
