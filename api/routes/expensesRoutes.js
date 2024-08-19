const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');  // Import the controller

// Routes for expense management
router.post('/api/expenses', expensesController.addExpense);
router.get('/api/expenses', expensesController.getExpenses);
router.put('/api/expenses/:expense_id', expensesController.updateExpense);
router.delete('/api/expenses/:expense_id', expensesController.deleteExpense); 

module.exports = router;
