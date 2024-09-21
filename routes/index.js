const express = require('express');
const router = express.Router();
const path = require('path');

// Simulated product data
const products = [
    { id: 1, name: 'Product 1', price: 10.00 },
    { id: 2, name: 'Product 2', price: 20.00 },
];

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
