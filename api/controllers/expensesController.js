const db = require('../config/dbconfig');  

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
 // Fetch expenses
     // Fetch all expenses
     getExpenses: async (req, res) => {
        try {
            const userId = req.session.userId; // Assuming userId is stored in the session after login
            const [expenses] = await db.query(`
                SELECT e.date, c.category_name, e.amount, pm.payment_method_name, e.description, e.expense_id
                FROM expenses e
                JOIN categories c ON e.category_id = c.category_id
                JOIN payment_methods pm ON e.user_id = pm.user_id
                WHERE e.user_id = ?
            `, [userId]);
            console.log(expenses)
            res.status(200).json(expenses);
        } catch (error) {
            console.error('Error fetching expenses:', error);
            res.status(500).json({ message: `Error fetching expenses ${error}` });
        }
    },


  // Update expense
updateExpense: async (req, res) => {
    try {
        const { expenseId } = req.params; // Get expenseId from request params
        const { date, category, amount, paymentMethod, description } = req.body;

        // Get category ID (optional: you can update category as well)
        const [categoryResult] = await db.query(
            'SELECT category_id FROM categories WHERE category_name = ? AND user_id = ?',
            [category, req.session.userId]
        );
        const categoryId = categoryResult[0].category_id;

        // Get payment method ID (optional: you can update payment method as well)
        const [paymentMethodResult] = await db.query(
            'SELECT payment_method_id FROM payment_methods WHERE payment_method_name = ? AND user_id = ?',
            [paymentMethod, req.session.userId]
        );
        const paymentMethodId = paymentMethodResult[0].payment_method_id;

        // Update the expense
        await db.query(
            'UPDATE expenses SET date = ?, category_id = ?, amount = ?, payment_method_id = ?, description = ? WHERE expense_id = ? AND user_id = ?',
            [date, categoryId, amount, paymentMethodId, description, expenseId, req.session.userId]
        );

        res.status(200).json({ message: 'Expense updated successfully' });
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ message: 'Error updating expense' });
    }
},

// Delete expense
deleteExpense: async (req, res) => {
    try {
        const { expenseId } = req.params; // Get expenseId from request params

        // Delete the expense
        await db.query(
            'DELETE FROM expenses WHERE expense_id = ? AND user_id = ?',
            [expenseId, req.session.userId]
        );

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Error deleting expense' });
    }
},

  

};



module.exports = expensesController;



