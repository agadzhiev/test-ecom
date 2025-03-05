// Фейковые товары
const products = [
    { id: 1, name: "Nike Air Max", brand: "nike", price: 12000, img: "https://via.placeholder.com/250?text=Nike+Air+Max" },
    { id: 2, name: "Adidas Ultraboost", brand: "adidas", price: 15000, img: "https://via.placeholder.com/250?text=Adidas+Ultraboost" },
    { id: 3, name: "Puma RS-X", brand: "puma", price: 10000, img: "https://via.placeholder.com/250?text=Puma+RS-X" },
    { id: 4, name: "Nike React Infinity", brand: "nike", price: 13000, img: "https://via.placeholder.com/250?text=Nike+React+Infinity" },
    { id: 5, name: "Adidas NMD", brand: "adidas", price: 11000, img: "https://via.placeholder.com/250?text=Adidas+NMD" }
];

// Локальное хранилище для корзины
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Функция отрисовки товаров на странице каталога
function renderProducts(filteredProducts = products) {
    const productsContainer = document.getElementById("products");
    if (!productsContainer) return;

    productsContainer.innerHTML = ""; // Очищаем перед рендером

    filteredProducts.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-card");
        productElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price} ₽</p>
            <button onclick="addToCart(${product.id})">Добавить в корзину</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Фильтрация товаров
function applyFilters() {
    const brandFilter = document.getElementById("brand").value;
    const maxPrice = document.getElementById("price").value;

    let filteredProducts = products;

    if (brandFilter !== "all") {
        filteredProducts = filteredProducts.filter(p => p.brand === brandFilter);
    }

    if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
    }

    renderProducts(filteredProducts);
}

// Добавление товара в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Обновление счетчика товаров в корзине
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Отображение корзины на странице cart.html
function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    
    if (!cartContainer || !totalPriceElement) return;

    cartContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p>${item.price} ₽</p>
            </div>
            <button onclick="removeFromCart(${index})">Удалить</button>
        `;
        cartContainer.appendChild(cartItem);
        totalPrice += item.price;
    });

    totalPriceElement.textContent = totalPrice;
}

// Удаление товара из корзины
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// Оформление заказа (фейковое)
function checkout() {
    alert("Заказ успешно оформлен!");
    localStorage.removeItem("cart");
    location.reload();
}

// Привязка событий к кнопкам и загрузка данных
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(); // Отрисовка товаров
    updateCartCount(); // Обновление счетчика корзины

    if (document.getElementById("apply-filters")) {
        document.getElementById("apply-filters").addEventListener("click", applyFilters);
    }

    if (document.getElementById("checkout")) {
        document.getElementById("checkout").addEventListener("click", checkout);
    }

    renderCart();
});
