const config = require('../config');

// Dynamically load the correct payment service based on config
let paymentService;

switch (config.paymentProvider) {
    case 'stripe':
        paymentService = require('./stripe');
        break;
    case 'paypal':
        paymentService = require('./paypal');
        break;
    default:
        throw new Error(`Unsupported payment provider: ${config.paymentProvider}`);
}

module.exports = paymentService;
