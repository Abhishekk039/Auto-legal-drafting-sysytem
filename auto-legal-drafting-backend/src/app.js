const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging (only in development)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rate limiting
app.use('/api/', apiLimiter);

// Routes
const auth = require('./routes/auth');
const users = require('./routes/users');
const documents = require('./routes/documents');
const lawyers = require('./routes/lawyers');
const reviews = require('./routes/reviews');
const payouts = require('./routes/payouts');
const notifications = require('./routes/notifications');

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/documents', documents);
app.use('/api/lawyers', lawyers);
app.use('/api/reviews', reviews);
app.use('/api/payouts', payouts);
app.use('/api/notifications', notifications);

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Auto-Legal Drafting API is running',
        version: '1.0.0'
    });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
