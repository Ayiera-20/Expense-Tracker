function isAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        return res.status(401).json({ message: 'User not authenticated' }); 
    }
}

module.exports = isAuthenticated;
