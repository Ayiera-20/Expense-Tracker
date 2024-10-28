const express = require('express');
const router = express.Router();
const path = require('path');

// Route for serving the register page
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'register.html'));
});

// Route for serving the login page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'login.html'));
});


// Route for serving the home page
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'home.html'));
});

// Route for serving the welcome page
router.get('/welcome', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'welcome.html'));
});

// Route for serving the add_expense page
router.get('/add_expense', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'add_expense.html'));
});

// Route for serving the edit_expense page
router.get('/edit_expense', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'edit_expense.html'));
});

// Route for serving the view_expense page
router.get('/view_expense', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'view_expense.html'));
});

module.exports = router;
