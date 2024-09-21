const paypal = require('@paypal/checkout-server-sdk');
const config = require('../config');

// Set up PayPal environment
let environment;
if (config.paypal.mode === 'live') {
    environment = new paypal.core.LiveEnvironment(config.paypal.clientId, config.paypal.clientSecret);
} else {
    environment = new paypal.core.SandboxEnvironment(config.paypal.clientId, config.paypal.clientSecret);
}
const client = new paypal.core.PayPalHttpClient(environment);

module.exports = {
    // Create a PayPal order
    createOrder: async (totalAmount) => {
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: config.currency,
                    value: totalAmount.toFixed(2),
                },
            }],
        });

        try {
            const order = await client.execute(request);
            return order.result.id;
        } catch (err) {
            console.error('Error creating PayPal order:', err);
            throw new Error('Failed to create PayPal order');
        }
    },

    // Capture PayPal order
    captureOrder: async (orderID) => {
        const request = new paypal.orders.OrdersCaptureRequest(orderID);
        request.requestBody({});

        try {
            const capture = await client.execute(request);
            return capture;
        } catch (err) {
            console.error('Error capturing PayPal order:', err);
            throw new Error('Failed to capture PayPal order');
        }
    },
};
