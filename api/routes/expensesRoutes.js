const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');  // Import the controller

// Routes for expense management
router.post('/api/expenses', expensesController.addExpense);
router.get('/api/get-expenses', expensesController.getExpenses);
router.put('/api/update-expense/:expenseId', expensesController.updateExpense);
router.delete('/api/delete-expense/:expenseId', expensesController.deleteExpense);


module.exports = router;
