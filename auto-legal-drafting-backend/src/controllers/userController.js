const User = require('../models/User');
const { NotFoundError, ForbiddenError } = require('../middleware/errorHandler');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            metadata: req.body.metadata,
            specialization: req.body.specialization,
            licenseNumber: req.body.licenseNumber
        };

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
exports.getAllUsers = async (req, res, next) => {
    try {
        const { role, kycStatus, page = 1, limit = 10 } = req.query;

        const query = {};
        if (role) query.role = role;
        if (kycStatus) query.kycStatus = kycStatus;

        const users = await User.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .select('-password -refreshToken');

        const count = await User.countDocuments(query);

        res.status(200).json({
            success: true,
            count,
            data: users,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update user status (Admin only)
// @route   PUT /api/users/:id/status
// @access  Private/Admin
exports.updateUserStatus = async (req, res, next) => {
    try {
        const { isActive, isBlocked, kycStatus } = req.body;

        const updateData = {};
        if (typeof isActive !== 'undefined') updateData.isActive = isActive;
        if (typeof isBlocked !== 'undefined') updateData.isBlocked = isBlocked;
        if (kycStatus) updateData.kycStatus = kycStatus;

        const user = await User.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        }).select('-password -refreshToken');

        if (!user) {
            throw new NotFoundError('User not found');
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};

module.exports = exports;
