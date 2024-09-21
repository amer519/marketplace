// Retrieve the cart from localStorage or initialize an empty array if it doesn't exist
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Cart display elements
const cartContent = document.getElementById('cart-content');
const cartTotalElement = document.getElementById('cart-total');

// Function to render the cart items
function renderCart() {
    cartContent.innerHTML = ''; // Clear the previous cart content
    let total = 0; // Initialize the total cost

    // Check if the cart is empty
    if (cart.length === 0) {
        cartContent.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
        cartTotalElement.innerText = ''; // No total to show
        return; // Exit the function since the cart is empty
    }

    // Loop through the cart items and display them
    cart.forEach(product => {
        total += product.price * product.quantity; // Update the total price

        // Use a default image if product.image is missing or undefined
        const productImage = product.image ? product.image : '/images/default.jpg'; // Fallback image

        // Create a product row for each item
        const productRow = document.createElement('div');
        productRow.classList.add('cart-item');

        productRow.innerHTML = `
            <div class="product-details">
                <img src="${productImage}" alt="${product.name} Image">
                <p>${product.name}</p>
            </div>
            <div class="quantity-controls">
                <button class="decrease-quantity" data-id="${product.id}">−</button>
                <span class="quantity">${product.quantity}</span>
                <button class="increase-quantity" data-id="${product.id}">+</button>
            </div>
            <p class="product-total-price">$${(product.price * product.quantity).toFixed(2)}</p>
            <button class="btn btn-danger remove-item" data-id="${product.id}">X</button>
        `;

        // Append the product row to the cart content
        cartContent.appendChild(productRow);
    });

    // Update the total amount in the cart
    cartTotalElement.innerText = `Total: $${total.toFixed(2)}`;

    // Attach event listeners for quantity adjustment and item removal
    attachEventListeners();
}

// Function to attach event listeners to the buttons
function attachEventListeners() {
    // Increase quantity buttons
    const increaseButtons = document.querySelectorAll('.increase-quantity');
    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            adjustQuantity(button.getAttribute('data-id'), 1);
        });
    });

    // Decrease quantity buttons
    const decreaseButtons = document.querySelectorAll('.decrease-quantity');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            adjustQuantity(button.getAttribute('data-id'), -1);
        });
    });

    // Remove item buttons
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            removeFromCart(button.getAttribute('data-id'));
        });
    });
}

// Function to adjust the quantity of an item
function adjustQuantity(productId, change) {
    const productIndex = cart.findIndex(product => product.id == productId);

    if (productIndex !== -1) {
        cart[productIndex].quantity += change;

        // Remove item if quantity is less than 1
        if (cart[productIndex].quantity < 1) {
            cart.splice(productIndex, 1);
        }

        // Update the cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Re-render the cart
        renderCart();
    }
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    // Filter out the product with the given ID
    cart = cart.filter(product => product.id != productId);

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Re-render the cart
    renderCart();
}

// Render the cart when the page loads
renderCart();
