const Notification = require('../models/Notification');
const { getEmailService } = require('./emailService');

class NotificationService {
    constructor() {
        this.emailService = getEmailService();
    }

    async createNotification(data) {
        try {
            const notification = await Notification.create(data);
            return notification;
        } catch (error) {
            console.error('Failed to create notification:', error);
            return null;
        }
    }

    async notifyReviewRequest(user, lawyer, document, review) {
        // Create in-app notification
        await this.createNotification({
            user: lawyer._id,
            type: 'review_request',
            title: 'New Review Request',
            message: `You have a new ${review.pricingTier} review request for ${document.template_id}`,
            relatedDocument: document._id,
            relatedReview: review._id
        });

        // Send email notification
        await this.emailService.sendReviewRequestEmail(user, lawyer, document, review);
    }

    async notifyReviewCompleted(user, lawyer, document, review) {
        // Create in-app notification
        await this.createNotification({
            user: user._id,
            type: 'review_completed',
            title: 'Document Review Completed',
            message: `Your ${document.template_id} has been reviewed by ${lawyer.name}`,
            relatedDocument: document._id,
            relatedReview: review._id
        });

        // Send email notification
        await this.emailService.sendReviewCompletedEmail(user, lawyer, document);
    }

    async notifyPayment(lawyer, amount, payout) {
        await this.createNotification({
            user: lawyer._id,
            type: 'payment',
            title: 'Payout Processed',
            message: `Your payout of ₹${amount} has been processed`,
            metadata: { payoutId: payout._id }
        });
    }

    async notifyUserWelcome(user) {
        await this.emailService.sendWelcomeEmail(user);
    }

    async getUserNotifications(userId, isRead = null) {
        const query = { user: userId };
        if (isRead !== null) {
            query.isRead = isRead;
        }

        return await Notification.find(query)
            .sort({ createdAt: -1 })
            .limit(50);
    }

    async markAsRead(notificationId, userId) {
        return await Notification.findOneAndUpdate(
            { _id: notificationId, user: userId },
            { isRead: true },
            { new: true }
        );
    }

    async markAllAsRead(userId) {
        return await Notification.updateMany(
            { user: userId, isRead: false },
            { isRead: true }
        );
    }
}

module.exports = new NotificationService();
