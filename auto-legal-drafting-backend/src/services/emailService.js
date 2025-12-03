// Mock email service - can be replaced with SendGrid, SES, etc.
class MockEmailService {
    async sendEmail({ to, subject, html, text }) {
        console.log('📧 [MOCK EMAIL] Sending email:');
        console.log('To:', to);
        console.log('Subject:', subject);
        console.log('Body:', text || html);
        return { success: true, messageId: 'mock-' + Date.now() };
    }

    async sendReviewRequestEmail(user, lawyer, document, review) {
        return this.sendEmail({
            to: lawyer.email,
            subject: 'New Review Request - Auto Legal Drafting',
            text: `Hi ${lawyer.name},\n\nYou have a new review request for a ${document.template_id}.\n\nClient: ${user.name}\nTier: ${review.pricingTier}\nDeadline: ${review.slaDeadline}\n\nPlease login to review the document.\n\nBest regards,\nAuto Legal Drafting Team`
        });
    }

    async sendReviewCompletedEmail(user, lawyer, document) {
        return this.sendEmail({
            to: user.email,
            subject: 'Document Review Completed - Auto Legal Drafting',
            text: `Hi ${user.name},\n\nYour ${document.template_id} has been reviewed by ${lawyer.name}.\n\nPlease login to view the reviewed document.\n\nBest regards,\nAuto Legal Drafting Team`
        });
    }

    async sendWelcomeEmail(user) {
        return this.sendEmail({
            to: user.email,
            subject: 'Welcome to Auto Legal Drafting!',
            text: `Hi ${user.name},\n\nWelcome to Auto Legal Drafting! We're excited to have you on board.\n\nGet started by creating your first legal document.\n\nBest regards,\nAuto Legal Drafting Team`
        });
    }
}

// SendGrid Email Service (requires SENDGRID_API_KEY)
class SendGridService {
    constructor() {
        this.apiKey = process.env.SENDGRID_API_KEY;
        this.from = process.env.EMAIL_FROM || 'noreply@autolegal.com';
    }

    async sendEmail({ to, subject, html, text }) {
        try {
            const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    personalizations: [{ to: [{ email: to }] }],
                    from: { email: this.from },
                    subject,
                    content: [
                        { type: 'text/plain', value: text || '' },
                        { type: 'text/html', value: html || text }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error('SendGrid API error');
            }

            return { success: true };
        } catch (error) {
            console.error('Email sending failed:', error);
            return { success: false, error: error.message };
        }
    }

    async sendReviewRequestEmail(user, lawyer, document, review) {
        return this.sendEmail({
            to: lawyer.email,
            subject: 'New Review Request - Auto Legal Drafting',
            text: `Hi ${lawyer.name},\n\nYou have a new review request for a ${document.template_id}.\n\nClient: ${user.name}\nTier: ${review.pricingTier}\nDeadline: ${review.slaDeadline}\n\nPlease login to review the document.\n\nBest regards,\nAuto Legal Drafting Team`
        });
    }

    async sendReviewCompletedEmail(user, lawyer, document) {
        return this.sendEmail({
            to: user.email,
            subject: 'Document Review Completed - Auto Legal Drafting',
            text: `Hi ${user.name},\n\nYour ${document.template_id} has been reviewed by ${lawyer.name}.\n\nPlease login to view the reviewed document.\n\nBest regards,\nAuto Legal Drafting Team`
        });
    }

    async sendWelcomeEmail(user) {
        return this.sendEmail({
            to: user.email,
            subject: 'Welcome to Auto Legal Drafting!',
            text: `Hi ${user.name},\n\nWelcome to Auto Legal Drafting! We're excited to have you on board.\n\nGet started by creating your first legal document.\n\nBest regards,\nAuto Legal Drafting Team`
        });
    }
}

// Factory to get the appropriate email service
const getEmailService = () => {
    const service = process.env.EMAIL_SERVICE || 'mock';

    switch (service) {
        case 'sendgrid':
            return new SendGridService();
        case 'mock':
        default:
            return new MockEmailService();
    }
};

module.exports = { getEmailService };
