const db = require('./dbconfig');

// Use async/await for the database creation queries
const createDatabaseAndTables = async () => {
    try {
        // Create the database
        // await db.query('CREATE DATABASE IF NOT EXISTS expense_tracker');
        // console.log("Database: expense_tracker successfully created");

        // // Switch to the newly created database
        // await db.query('USE expense_tracker');
        // console.log("Database changed");

        // Create the users table
        const userTableQuery = `CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(100) NOT NULL UNIQUE,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        )`;
        await db.query(userTableQuery);
        console.log("Users table successfully created");

        // Create the categories table
        const categoriesTableQuery = `CREATE TABLE IF NOT EXISTS categories (
            category_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            category_name VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`;
        await db.query(categoriesTableQuery);
        console.log("Categories table successfully created");

        // Create the payment methods table
        const paymentmethodsTableQuery = `CREATE TABLE IF NOT EXISTS payment_methods (
            payment_method_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            payment_method_name VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`;
        await db.query(paymentmethodsTableQuery);
        console.log("Payment Methods table successfully created");

        // Create the expenses table
        const expensesTableQuery = `CREATE TABLE IF NOT EXISTS expenses (
            expense_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            category_id INT,
            payment_method_id INT,
            amount DECIMAL(10, 2) NOT NULL,
            date DATE NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (category_id) REFERENCES categories(category_id),
            FOREIGN KEY (payment_method_id) REFERENCES payment_methods(payment_method_id)
        )`;
        await db.query(expensesTableQuery);
        console.log("Expenses table successfully created");


        // Create the budgets table
        const budgetsTableQuery = `CREATE TABLE IF NOT EXISTS budgets (
            budget_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            category_id INT,
            amount DECIMAL(10, 2) NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (category_id) REFERENCES categories(category_id)
        )`;
        await db.query(budgetsTableQuery);
        console.log("Budgets table successfully created");

    } catch (err) {
        console.error("Error with database setup:", err);
    }
};

module.exports = { createDatabaseAndTables };
