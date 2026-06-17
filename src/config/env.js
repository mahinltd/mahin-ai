const logger = require('../utils/logger');

const readFirstEnv = (keys) => {
    for (const key of keys) {
        const value = String(process.env[key] || '').trim();
        if (value) {
            return value;
        }
    }

    return '';
};

const validateStartupEnv = () => {
    const issues = [];

    if (!readFirstEnv(['MONGO_URI', 'MONGODB_URI'])) {
        issues.push('Missing MongoDB connection string (MONGO_URI or MONGODB_URI).');
    }

    if (!readFirstEnv(['JWT_SECRET'])) {
        issues.push('Missing JWT_SECRET.');
    }

    if (issues.length > 0) {
        throw new Error(issues.join(' '));
    }

    const warnings = [];

    if (!readFirstEnv(['RESEND_API_KEY'])) {
        warnings.push('RESEND_API_KEY is missing. Email notifications will fail until configured.');
    }

    if (!readFirstEnv(['ADMIN_EMAIL'])) {
        warnings.push('ADMIN_EMAIL is missing. Admin bootstrap and authorization fallback may be affected.');
    }

    if (!readFirstEnv(['PUTER_AUTH_TOKEN1', 'PUTER_AUTH_TOKEN_1'])) {
        warnings.push('No Puter auth token found. AI chat will fail until at least one token is configured.');
    }

    if (!readFirstEnv(['PAYPAL_CLIENT_ID']) || !readFirstEnv(['PAYPAL_CLIENT_SECRET'])) {
        warnings.push('PayPal credentials are missing. PayPal verification will be unavailable.');
    }

    if (!readFirstEnv(['CLOUDINARY_CLOUD_NAME']) || !readFirstEnv(['CLOUDINARY_API_KEY']) || !readFirstEnv(['CLOUDINARY_API_SECRET'])) {
        warnings.push('Cloudinary credentials are missing. Cloud upload helpers will be unavailable.');
    }

    warnings.forEach((warning) => logger.warn(warning));
};

module.exports = { validateStartupEnv };