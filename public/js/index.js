// index.js

// Example product data
const products = [
    { id: 1, name: 'Spider', price: 10.00, image: '/images/product1.jpg' },
    { id: 2, name: 'The Iron', price: 20.00, image: '/images/product2.jpg' },
    { id: 3, name: 'Son Goku', price: 10.00, image: '/images/product3.jpg' },
    { id: 4, name: 'Groo Groo', price: 20.00, image: '/images/product4.png' },
    { id: 5, name: 'Lil Rugrat', price: 10.00, image: '/images/product5.jpg' },
    { id: 6, name: 'Togi-egg', price: 20.00, image: '/images/product6.jpg' },
    { id: 7, name: 'Nino', price: 10.00, image: '/images/product7.jpg' },
    { id: 8, name: 'Oreo', price: 20.00, image: '/images/product8.jpg' },
    { id: 9, name: 'Smarto', price: 10.00, image: '/images/product9.png' },
    { id: 10, name: 'Elvis', price: 20.00, image: '/images/product10.jpg'}
    // Add more products as needed
];

// Function to render the products
function renderProducts() {
    const productGrid = document.getElementById('product-grid');

    // Clear any existing content (if necessary)
    productGrid.innerHTML = '';

    products.forEach(product => {
        // Create product card element
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        // Create and append product image
        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;
        productImage.classList.add('product-image');
        productCard.appendChild(productImage);

        // Create and append product title
        const productTitle = document.createElement('h2');
        productTitle.classList.add('product-title');
        productTitle.textContent = product.name;
        productCard.appendChild(productTitle);

        // Create and append product price
        const productPrice = document.createElement('p');
        productPrice.classList.add('product-price');
        productPrice.textContent = `$${product.price.toFixed(2)}`;
        productCard.appendChild(productPrice);

        // Create and append 'View Product' button
        const viewProductButton = document.createElement('a');
        viewProductButton.href = `/product.html?id=${product.id}`;
        viewProductButton.classList.add('btn', 'btn-primary');
        viewProductButton.textContent = 'View Product';
        productCard.appendChild(viewProductButton);

        // Append the product card to the product grid
        productGrid.appendChild(productCard);
    });
}

// Render products when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', renderProducts);
