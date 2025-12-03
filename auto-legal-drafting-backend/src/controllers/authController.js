const User = require('../models/User');
const { ValidationError, AuthenticationError } = require('../middleware/errorHandler');
const notificationService = require('../services/notificationService');

// @desc    Register user / Signup
// @route   POST /api/auth/register || POST /api/auth/signup
// @access  Public
const register = async (req, res, next) => {
    console.log('Register called');

    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ValidationError('Email already registered');
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password,
        role: role || 'user'
    });

    // Send welcome email
    try {
        await notificationService.notifyUserWelcome(user);
    } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Continue execution even if email fails
    }

    await sendTokenResponse(user, 201, res);
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            throw new ValidationError('Please provide an email and password');
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password +refreshToken');

        if (!user) {
            throw new AuthenticationError('Invalid credentials');
        }

        // Check if user is blocked
        if (user.isBlocked) {
            throw new AuthenticationError('Account has been blocked. Please contact support.');
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            throw new AuthenticationError('Invalid credentials');
        }

        await sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res, next) => {
    try {
        // Clear refresh token from database
        await User.findByIdAndUpdate(req.user.id, { refreshToken: null });

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            throw new AuthenticationError('Refresh token required');
        }

        // Verify refresh token
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // Find user and verify refresh token
        const user = await User.findById(decoded.id).select('+refreshToken');

        if (!user || user.refreshToken !== refreshToken) {
            throw new AuthenticationError('Invalid refresh token');
        }

        // Generate new tokens
        await sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = async (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();
    const refreshToken = user.getRefreshToken();

    // Save refresh token to database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    };

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                kycStatus: user.kycStatus
            },
        });
};

module.exports = {
    register,
    signup: register,
    login,
    logout,
    refreshToken,
    getMe
};
