const express = require('express');
const {
    getProfile,
    updateProfile,
    getAllUsers,
    updateUserStatus
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/profile')
    .get(getProfile)
    .put(updateProfile);

router.route('/')
    .get(authorize('admin'), getAllUsers);

router.route('/:id/status')
    .put(authorize('admin'), updateUserStatus);

module.exports = router;
