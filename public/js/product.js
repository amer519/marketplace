// Assuming you're serving products from the backend
const products = [
    { id: 1, name: 'Product 1', price: 10.00 },
    { id: 2, name: 'Product 2', price: 20.00 },
];

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
    document.getElementById('product-image').src = `/images/product${product.id}.jpg`;
} else {
    document.getElementById('product-title').innerText = 'Product Not Found';
}

// Add to Cart functionality
document.getElementById('add-to-cart').addEventListener('click', function() {
    if (product) {
        console.log(`${product.name} added to cart!`);
        alert(`${product.name} added to your cart!`);
    }
});
