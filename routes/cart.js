const express = require('express');
const router = express.Router();
const paymentService = require('../payments/paymentFactory');

// Simulated user cart
let cart = { items: [{ name: 'Product 1', price: 10.00, quantity: 1 }], totalAmount: 10.00 };

// Get current cart items
router.get('/', (req, res) => {
    res.json(cart);
});

// Create an order (Stripe/PayPal depending on config)
router.post('/create-order', async (req, res) => {
    try {
        const orderID = await paymentService.createOrder(cart.totalAmount, cart.items);
        res.json({ orderID });
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Capture the payment (for PayPal)
router.post('/capture-order', async (req, res) => {
    const { orderID } = req.query;
    try {
        const captureResult = await paymentService.captureOrder(orderID);
        res.json(captureResult);
    } catch (err) {
        console.error('Error capturing order:', err);
        res.status(500).json({ error: 'Failed to capture order' });
    }
});

module.exports = router;
