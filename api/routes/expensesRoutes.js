const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController'); 
const isAuthenticated = require('../middleware/authMiddleware'); 

// Routes for expense management
router.post('/api/expenses', isAuthenticated, expensesController.addExpense);
router.get('/api/get-expenses', isAuthenticated, expensesController.getExpenses);
router.put('/api/update-expense/:expenseId', isAuthenticated, expensesController.updateExpense);
router.delete('/api/delete-expense/:expenseId', isAuthenticated, expensesController.deleteExpense);


module.exports = router;
