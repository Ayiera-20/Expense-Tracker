const db = require('../config/dbconfig');  // Import your DB config

const expensesController = {
    // Add an expense
    addExpense: async (req, res) => {
        try {
            const { date, category, amount, paymentMethod, description } = req.body;

            // Insert category logic
            const [categoryResult] = await db.query(
                'INSERT INTO categories (category_name, user_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE category_name=category_name',
                [category, req.session.userId]
            );

            const categoryId = categoryResult.insertId;

            // Insert payment method logic (if it doesn't exist already)
            await db.query(
                'INSERT INTO payment_methods (payment_method_name, user_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE payment_method_name=payment_method_name',
                [paymentMethod, req.session.userId]
                );

            // Insert expense logic
            const [expenseResult] = await db.query(
                'INSERT INTO expenses (user_id, category_id, amount, date, description) VALUES (?, ?, ?, ?, ?)',
                [req.session.userId, categoryId, amount, date, description]
            );

            res.status(201).json({ message: 'Expense added successfully' });
        } catch (error) {
            console.error('Error inserting expense:', error);
            res.status(500).json({ message: 'Error adding expense' });
        }
    },

    // Fetch all expenses
    getExpenses: async (req, res) => {
        try {
            const userId = req.session.userId; // Assuming userId is stored in the session after login
            const [expenses] = await db.query(`
                SELECT e.date, c.category_name, e.amount, pm.payment_method_name, e.description
                FROM expenses e
                JOIN categories c ON e.category_id = c.category_id
                JOIN payment_methods pm ON e.user_id = pm.user_id
                WHERE e.user_id = ?
            `, [userId]);
            res.status(200).json(expenses);
        } catch (error) {
            console.error('Error fetching expenses:', error);
            res.status(500).json({ message: 'Error fetching expenses' });
        }
    },


    // Update an expense (you can customize this as needed)
    updateExpense: async (req, res) => {
        try {
            const { expense_id } = req.params;  // Get the expense_id from the URL
            const { date, category_name, amount, payment_method_name, description } = req.body;
    
            const userId = req.session.userId;
    
            // Check if the expense exists
            const [expense] = await db.query('SELECT * FROM expenses WHERE expense_id = ? AND user_id = ?', [expense_id, userId]);
            if (!expense.length) {
                return res.status(404).json({ message: 'Expense not found' });
            }
    
            // Update the expense in the database
            await db.query(
                'UPDATE expenses SET date = ?, amount = ?, description = ? WHERE expense_id = ? AND user_id = ?',
                [date, amount, description, expense_id, userId]
            );
    
            res.status(200).json({ message: 'Expense updated successfully' });
        } catch (error) {
            console.error('Error updating expense:', error);
            res.status(500).json({ message: 'Error updating expense' });
        }
    },
    
    
    

    // Delete an expense
    deleteExpense: async (req, res) => {
        try {
            const { expense_id } = req.params;

            // Logic for deleting expense
            await db.query(
                'DELETE FROM expenses WHERE expense_id = ? AND user_id = ?',
                [expense_id, req.session.userId]
            );

            res.status(200).json({ message: 'Expense deleted successfully' });
        } catch (error) {
            console.error('Error deleting expense:', error);
            res.status(500).json({ message: 'Error deleting expense' });
        }
    }
};



module.exports = expensesController;
