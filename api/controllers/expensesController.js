const db = require('../config/dbconfig');  

const expensesController = {
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
            const [paymentMethodResult] =await db.query(
                'INSERT INTO payment_methods (payment_method_name, user_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE payment_method_name=payment_method_name',
                [paymentMethod, req.session.userId]
                );
            
                const paymentMethodId= paymentMethodResult.insertId

            // Insert expense logic
            const [expenseResult] = await db.query(
                'INSERT INTO expenses (user_id, category_id, payment_method_id, amount, date, description) VALUES (?, ?, ?, ?, ?, ?)',
                [req.session.userId, categoryId, paymentMethodId, amount, date, description]
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
            const userId = req.session.userId; 
            const [expenses] = await db.query(`
                SELECT e.date, c.category_name, e.amount, pm.payment_method_name, e.description, e.expense_id
                FROM expenses e
                JOIN categories c ON e.category_id = c.category_id
                JOIN payment_methods pm ON e.payment_method_id = pm.payment_method_id
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
        const { expenseId } = req.params; 
        const { date, category_name, amount, payment_method_name, description } = req.body;
        const userId = req.session.userId;

        // Check if all necessary data is provided
        if (!expenseId || !date || !category_name || !amount || !payment_method_name || !description) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Get category ID
        const [categoryResult] = await db.query(
            'SELECT category_id FROM categories WHERE category_name = ? AND user_id = ?',
            [category_name, userId]
        );
        
        if (categoryResult.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        
        const categoryId = categoryResult[0].category_id;

        // Get payment method ID
        const [paymentMethodResult] = await db.query(
            'SELECT payment_method_id FROM payment_methods WHERE payment_method_name = ? AND user_id = ?',
            [payment_method_name, userId]
        );
        
        if (paymentMethodResult.length === 0) {
            return res.status(404).json({ message: 'Payment method not found' });
        }
        
        const paymentMethodId = paymentMethodResult[0].payment_method_id;

        // Update the expense
        await db.query(
            'UPDATE expenses SET date = ?, category_id = ?, amount = ?, payment_method_id = ?, description = ? WHERE expense_id = ? AND user_id = ?',
            [date, categoryId, amount, paymentMethodId, description, expenseId, userId]
        );

        res.status(200).json({ message: 'Expense updated successfully' });
    } catch (error) {
        console.error('Error updating expense:', error.message); 
        res.status(500).json({ message: 'Error updating expense' });
    }
},


// Delete expense
deleteExpense: async (req, res) => {
    try {
        const { expenseId } = req.params; 
        const userId = req.session.userId; 
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Check if the expense exists and belongs to the user
        const [expenseResult] = await db.query(
            'SELECT category_id, payment_method_id FROM expenses WHERE expense_id = ? AND user_id = ?',
            [expenseId, userId]
        );

        if (expenseResult.length === 0) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        const { category_id, payment_method_id } = expenseResult[0];

        // Delete the expense
        await db.query('DELETE FROM expenses WHERE expense_id = ? AND user_id = ?', [expenseId, userId]);

        const [categoryUsage] = await db.query(
            'SELECT COUNT(*) AS count FROM expenses WHERE category_id = ? AND user_id = ?',
            [category_id, userId]
        );

        if (categoryUsage[0].count === 0) {
            await db.query('DELETE FROM categories WHERE category_id = ? AND user_id = ?', [category_id, userId]);
        }

        const [paymentMethodUsage] = await db.query(
            'SELECT COUNT(*) AS count FROM expenses WHERE payment_method_id = ? AND user_id = ?',
            [payment_method_id, userId]
        );

        if (paymentMethodUsage[0].count === 0) {
            await db.query('DELETE FROM payment_methods WHERE payment_method_id = ? AND user_id = ?', [payment_method_id, userId]);
        }

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error.message);
        res.status(500).json({ message: 'Error deleting expense' });
    }
},
};



module.exports = expensesController;






