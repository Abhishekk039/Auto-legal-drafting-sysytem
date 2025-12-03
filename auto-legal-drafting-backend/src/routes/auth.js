const express = require('express');
const { register, signup, login, logout, refreshToken, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/register', authLimiter, register);
router.post('/signup', (req, res, next) => {
    console.log('Debug Middleware: req=', !!req, 'res=', !!res, 'next=', typeof next);
    if (typeof next === 'function') {
        next();
    } else {
        console.error('Debug Middleware: next is NOT a function');
        res.status(500).send('Middleware Error');
    }
}, signup);
router.post('/login', authLimiter, login);
router.post('/logout', protect, logout);
router.post('/refresh', refreshToken);
router.get('/me', protect, getMe);

module.exports = router;
