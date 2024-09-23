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


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'welcome.html'));
});

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: process.env.NODE_ENV === 'production', 
        httpOnly: true 
    }
}));


app.use('/api/auth', authRoutes);
app.use(expensesRoutes);
app.use(pagesRoutes);


// createDatabaseAndTables();



// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
