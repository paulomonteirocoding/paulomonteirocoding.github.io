const jwt = require('jsonwebtoken');
const process = require('process');

const authMiddleware = (req, res, next) => {

    // Check if the request has an authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token.', trace: err.message });
    }
};

module.exports = authMiddleware;