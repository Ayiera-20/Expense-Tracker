const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
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

const sessionStore = new MySQLStore({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT || 3306,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
});


// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStore,
//     cookie: { 
//         secure: process.env.NODE_ENV === 'production', 
//         httpOnly: true,
//         maxAge: 24 * 60 * 60 * 1000
//     },
//     store: new session.MemoryStore(),
// }));

app.use(session({
    secret: 'yourSecret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  }));

app.set('trust proxy', 1);


app.use('/api/auth', authRoutes);
app.use(expensesRoutes);
app.use(pagesRoutes);


// createDatabaseAndTables();


// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
