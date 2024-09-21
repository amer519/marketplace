// Configuration for payment providers
module.exports = {
    // Payment provider can be 'stripe' or 'paypal'
    paymentProvider: process.env.PAYMENT_PROVIDER || 'paypal',

    // PayPal configuration
    paypal: {
        clientId: process.env.PAYPAL_CLIENT_ID || 'YOUR_PAYPAL_SANDBOX_CLIENT_ID',
        clientSecret: process.env.PAYPAL_CLIENT_SECRET || 'YOUR_PAYPAL_SANDBOX_SECRET',
        mode: process.env.PAYPAL_MODE || 'sandbox',
    },

    // Stripe configuration
    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY || 'YOUR_STRIPE_SECRET_KEY',
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'YOUR_STRIPE_PUBLISHABLE_KEY',
    },

    // Global settings
    currency: 'USD',
    environment: process.env.NODE_ENV || 'development',
};
