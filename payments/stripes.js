const stripe = require('stripe')(require('../config').stripe.secretKey);
const config = require('../config');

module.exports = {
    // Create a Stripe Checkout session
    createOrder: async (totalAmount, cartItems) => {
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: cartItems.map(item => ({
                    price_data: {
                        currency: config.currency,
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: item.price * 100, // Stripe uses cents
                    },
                    quantity: item.quantity,
                })),
                mode: 'payment',
                success_url: 'http://localhost:3000/success',
                cancel_url: 'http://localhost:3000/cancel',
            });

            return session.id;
        } catch (err) {
            console.error('Error creating Stripe session:', err);
            throw new Error('Failed to create Stripe session');
        }
    },

    // Stripe automatically captures payments, so we simply return success
    captureOrder: async (sessionID) => {
        return { status: 'success' };
    },
};
