// Example product data
const products = [
    { id: 1, name: 'Product 1', price: 10.00, image: '/images/product1.jpg' },
    { id: 2, name: 'Product 2', price: 20.00, image: '/images/product2.jpg' }
];

// Function to update the cart counter
function updateCartCounter() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCounter = document.querySelector('.cart-counter');
    let totalQuantity = 0;

    // Calculate the total quantity of items in the cart
    cartItems.forEach(item => {
        totalQuantity += item.quantity;
    });

    // Update the counter display
    cartCounter.textContent = totalQuantity;
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Get product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Find the product based on the ID
    const product = products.find(p => p.id == productId);

    // Update the product details dynamically on the page
    if (product) {
        document.getElementById('product-title').innerText = product.name;
        document.getElementById('product-description').innerText = `This is the description for ${product.name}.`;
        document.getElementById('product-price').innerText = `$${product.price.toFixed(2)}`;
        document.getElementById('product-image').src = product.image;
    } else {
        document.getElementById('product-title').innerText = 'Product Not Found';
    }

    // Update the cart counter when the page loads
    updateCartCounter();

    // Function to display the notification
    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.add('show');
    
        // Hide the notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Add to Cart functionality
    const addToCartButton = document.getElementById('add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function () {
            if (product) {
                // Get the cart from localStorage or initialize an empty cart
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                
                // Check if the product is already in the cart
                const existingProduct = cart.find(p => p.id == product.id);

                if (existingProduct) {
                    // Increase the quantity if already in the cart
                    existingProduct.quantity += 1;
                } else {
                    // Add the new product to the cart with quantity 1
                    cart.push({ ...product, quantity: 1 });
                }

                // Save the updated cart to localStorage
                localStorage.setItem('cart', JSON.stringify(cart));

                // Update the cart counter after adding an item
                updateCartCounter();

                // Show the notification instead of alert
                showNotification(`${product.name} added to your cart!`);
            }
        });
    }
});