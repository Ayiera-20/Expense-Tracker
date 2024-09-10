const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const { createDatabaseAndTables } = require('./config/dbsetup');


// Import routes
const pagesRoutes = require('./routes/pagesRoutes');
const authRoutes = require('./routes/authRoutes');
const expensesRoutes = require('./routes/expensesRoutes'); 


// middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true }
}));


app.use('/api/auth', authRoutes);
app.use(expensesRoutes);
app.use(pagesRoutes);


createDatabaseAndTables();


// Basic route
app.get('', (req, res) => {
    res.send("Hello World");
});

// Start server
app.listen(4000, () => {
    console.log("server is running on port 4000");
});
