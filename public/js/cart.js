// Retrieve the cart from localStorage or initialize an empty array if it doesn't exist
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Cart display elements
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// Function to render the cart items
function renderCart() {
    cartItemsContainer.innerHTML = ''; // Clear the previous cart content
    let total = 0; // Initialize the total cost

    // Update the cart counter
    updateCartCounter();

    // Check if the cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
        cartTotalElement.innerText = ''; // No total to show
        return; // Exit the function since the cart is empty
    }

    // Loop through the cart items and display them
    cart.forEach((product, index) => {
        total += product.price * product.quantity; // Update the total price

        // Use a default image if product.image is missing or undefined
        const productImage = product.image ? product.image : '/images/default.jpg'; // Fallback image

        // Create cart item container
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        // Product Image
        const img = document.createElement('img');
        img.src = productImage;
        img.alt = product.name;
        img.classList.add('cart-item-image');

        // Item Details Container
        const details = document.createElement('div');
        details.classList.add('cart-item-details');

        // Product Title
        const title = document.createElement('p');
        title.classList.add('cart-item-title');
        title.textContent = product.name;

        // Product Price
        const price = document.createElement('p');
        price.classList.add('cart-item-price');
        price.textContent = `$${product.price.toFixed(2)}`;

        // Quantity Controls
        const quantityControls = document.createElement('div');
        quantityControls.classList.add('cart-item-quantity');

        const decreaseBtn = document.createElement('button');
        decreaseBtn.classList.add('quantity-decrease');
        decreaseBtn.textContent = '−';
        decreaseBtn.addEventListener('click', () => {
            adjustQuantity(product.id, -1);
        });

        const quantityInput = document.createElement('input');
        quantityInput.type = 'text';
        quantityInput.value = product.quantity;
        quantityInput.readOnly = true;

        const increaseBtn = document.createElement('button');
        increaseBtn.classList.add('quantity-increase');
        increaseBtn.textContent = '+';
        increaseBtn.addEventListener('click', () => {
            adjustQuantity(product.id, 1);
        });

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('cart-item-remove');
        removeBtn.innerHTML = '&times;';
        removeBtn.setAttribute('aria-label', 'Remove item');
        removeBtn.addEventListener('click', () => {
            removeFromCart(product.id);
        });

        // Append controls
        quantityControls.appendChild(decreaseBtn);
        quantityControls.appendChild(quantityInput);
        quantityControls.appendChild(increaseBtn);
        quantityControls.appendChild(removeBtn);

        // Append details
        details.appendChild(title);
        details.appendChild(price);
        details.appendChild(quantityControls);

        // Append image and details to cart item
        cartItem.appendChild(img);
        cartItem.appendChild(details);

        // Append cart item to cart items container
        cartItemsContainer.appendChild(cartItem);
    });

    // Update the total amount in the cart
    cartTotalElement.innerText = `Total: $${total.toFixed(2)}`;

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to adjust the quantity of an item
function adjustQuantity(productId, change) {
    const productIndex = cart.findIndex(product => product.id === productId);

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
    cart = cart.filter(product => product.id !== productId);

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Re-render the cart
    renderCart();
}

// Function to update the cart counter
function updateCartCounter() {
    const cartCounter = document.querySelector('.cart-counter');
    if (cartCounter) {
        const totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);
        cartCounter.textContent = totalQuantity;
    }
}

// Render the cart when the page loads
renderCart();