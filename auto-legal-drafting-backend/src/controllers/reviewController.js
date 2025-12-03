const Review = require('../models/Review');
const Document = require('../models/Document');
const User = require('../models/User');
const notificationService = require('../services/notificationService');
const { calculateSLADeadline, getPriceForTier } = require('../utils/helpers');
const { NotFoundError, ValidationError, ForbiddenError } = require('../middleware/errorHandler');

// @desc    Create review request
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res, next) => {
    try {
        const { documentId, pricingTier = 'standard' } = req.body;

        const document = await Document.findById(documentId);
        if (!document) {
            throw new NotFoundError('Document not found');
        }

        if (document.user.toString() !== req.user.id) {
            throw new ForbiddenError('Not authorized');
        }

        // Calculate SLA and price
        const slaDeadline = calculateSLADeadline(pricingTier);
        const price = getPriceForTier(pricingTier);

        // Find available lawyer (simple round-robin, can be enhanced)
        const lawyer = await User.findOne({ role: 'lawyer', isActive: true });

        if (!lawyer) {
            throw new ValidationError('No lawyers available');
        }

        const review = await Review.create({
            document: documentId,
            user: req.user.id,
            lawyer: lawyer._id,
            pricingTier,
            price,
            slaDeadline,
            status: 'pending'
        });

        // Update document
        await Document.findByIdAndUpdate(documentId, {
            assignedLawyer: lawyer._id,
            status: 'pending',
            pricingTier,
            price,
            slaDeadline
        });

        // Send notification
        await notificationService.notifyReviewRequest(req.user, lawyer, document, review);

        res.status(201).json({
            success: true,
            data: review
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Private
exports.getAllReviews = async (req, res, next) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;

        let query = {};

        if (req.user.role === 'user') {
            query.user = req.user.id;
        } else if (req.user.role === 'lawyer') {
            query.lawyer = req.user.id;
        }

        if (status) {
            query.status = status;
        }

        const reviews = await Review.find(query)
            .populate('document', 'title template_id')
            .populate('user', 'name email')
            .populate('lawyer', 'name email rating')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Review.countDocuments(query);

        res.status(200).json({
            success: true,
            count,
            data: reviews,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update review status
// @route   PUT /api/reviews/:id/status
// @access  Private (Lawyer)
exports.updateReviewStatus = async (req, res, next) => {
    try {
        const { status, comments, reviewedContent } = req.body;

        const review = await Review.findById(req.params.id);

        if (!review) {
            throw new NotFoundError('Review not found');
        }

        if (review.lawyer.toString() !== req.user.id && req.user.role !== 'admin') {
            throw new ForbiddenError('Not authorized');
        }

        review.status = status;
        if (comments) review.comments = comments;
        if (reviewedContent) review.lawyerNotes = reviewedContent;

        await review.save();

        // Update document
        const document = await Document.findById(review.document);
        if (document) {
            document.status = status === 'completed' ? 'reviewed' : 'pending';
            if (reviewedContent) {
                document.reviewedContent = reviewedContent;
            }
            await document.save();

            // Notify user if completed
            if (status === 'completed') {
                const user = await User.findById(review.user);
                const lawyer = await User.findById(review.lawyer);
                await notificationService.notifyReviewCompleted(user, lawyer, document, review);

                // Update lawyer stats
                lawyer.totalReviews += 1;
                await lawyer.save();
            }
        }

        res.status(200).json({
            success: true,
            data: review
        });
    } catch (err) {
        next(err);
    }
};

module.exports = exports;
