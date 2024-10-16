
"use strict";

let currentCategory = "all"; // Default category

// Fetching product data from the API
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    
    const containerProduct = document.getElementById("containerProduct");
    const searchInput = document.getElementById("searchInput");

    // Function to render product cards
    function renderCard(products) {
      containerProduct.innerHTML = ''; // Clear previous products

      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <div class="product-title">${product.title}</div>
          <div class="product-price">$${product.price}</div>
        `;
        containerProduct.appendChild(productCard);
      });
    }

    // Initial render of all products
    renderCard(data);

    // Event listeners for buttons
    document.getElementById("btn-electronics").addEventListener("click", () => {
      currentCategory = "electronics";
      filterProducts();
    });

    document.getElementById("btn-mens").addEventListener("click", () => {
      currentCategory = "men's clothing";
      filterProducts();
    });

    document.getElementById("btn-womens").addEventListener("click", () => {
      currentCategory = "women's clothing";
      filterProducts();
    });

    document.getElementById("btn-jewelery").addEventListener("click", () => {
      currentCategory = "jewelery";
      filterProducts();
    });

    // Function to filter products based on category and search input
    function filterProducts() {
      const searchTerms = searchInput.value.toLowerCase();
      const filteredProducts = data.filter(product => {
        const matchesCategory = currentCategory === "all" || product.category.toLowerCase() === currentCategory.toLowerCase();
        const matchesSearch = product.title.toLowerCase().includes(searchTerms);
        return matchesCategory && matchesSearch;
      });
      renderCard(filteredProducts);
    }

    // Event listener for the search input
    searchInput.addEventListener("input", filterProducts);
  })
  .catch((error) => console.log(error));