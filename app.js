const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

const app = express();

// Middleware to serve static files and parse request bodies
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);

// Route to serve cart.html when accessing /cart
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/cart.html'));
});

// Success and Cancel routes (for PayPal/Stripe)
app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/success.html'));
});

app.get('/cancel', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/cancel.html'));
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});