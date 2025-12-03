const express = require('express');
const { createReview, getAllReviews, updateReviewStatus } = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getAllReviews)
    .post(authorize('user'), createReview);

router.put('/:id/status', authorize('lawyer', 'admin'), updateReviewStatus);

module.exports = router;
