const express = require('express');
const router = express.Router();
const path = require('path');

// Import the products array from the data/products.js file
const products = require('../data/products');

// Serve the product page
router.get('/product/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (product) {
        res.sendFile(path.join(__dirname, '../public/product.html'));
    } else {
        res.status(404).send('Product not found');
    }
});

module.exports = router;
