const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];

/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
    const article = document.createElement('article');
    article.innerHTML = `
        <img src="${product.imageSrc}" alt="${product.name}" />
        <div class="product-details">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
            <div>
                <button class="buy-button">Add to cart</button>
                ${product.numInCart > 0 ? `<span class="num-in-cart">${product.numInCart} in cart</span>` : ''}
            </div>
        </div>
    `;

    // Add event listener to the Add to cart button
    const addButton = article.querySelector('.buy-button');
    addButton.addEventListener('click', () => {
        product.numInCart++;
        rerenderAllProducts();
        rerenderCart();
    });
    
    return article;
}

/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = '<h2>Search results</h2>';
    
    for (let product of PRODUCTS) {
        if (shouldProductBeVisible(product)) {
            productList.appendChild(renderProductCard(product));
        }
    }
}

/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
    /*
    1. remove all card items
    2. recreate them and the remove buttons based off the data in PRODUCTS
     */

    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';

    for (let i = 0; i < PRODUCTS.length; i++) {
        const product = PRODUCTS[i];
        if (product.numInCart > 0) {
            const p = document.createElement('p');
            p.textContent = `${product.name} x${product.numInCart}`;
            cartItems.appendChild(p);

            const btn = document.createElement('button');
            btn.className = 'remove-button';
            btn.textContent = 'Remove';
            btn.addEventListener('click', () => {
                product.numInCart = 0;
                rerenderAllProducts();
                rerenderCart();
            });
            cartItems.appendChild(btn);
        }
    }
}

const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");

/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {
    const min = Number.parseFloat(minPriceInput.value);
    const max = Number.parseFloat(maxPriceInput.value);

    if (!isNaN(min) && product.price < min) return false;
    if (!isNaN(max) && product.price > max) return false;
    return true;
}

// Set up filter event listeners
function setupFilters() {
    minPriceInput.addEventListener("change", rerenderAllProducts);
    maxPriceInput.addEventListener("change", rerenderAllProducts);
}

// Initialize the page
setupFilters();
rerenderAllProducts();
rerenderCart();
