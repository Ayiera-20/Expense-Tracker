const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./config/dbconfig');

// const MySQLStore = require('express-mysql-session')(session);
// const { createDatabaseAndTables } = require('./config/dbsetup');

require('dotenv').config();


// Import routes
const pagesRoutes = require('./routes/pagesRoutes');
const authRoutes = require('./routes/authRoutes');
const expensesRoutes = require('./routes/expensesRoutes');



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'welcome.html'));
});

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// const sessionStore = new MySQLStore({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT || 3306
// });


const sessionStore = new pgSession({
    pool: pool,  // Pass the pool object for session storage
});



app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { 
        secure: process.env.NODE_ENV === 'production', 
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
}));



app.use('/api/auth', authRoutes);
app.use(expensesRoutes);
app.use(pagesRoutes);


// createDatabaseAndTables();



// Start server
// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


module.exports = app;