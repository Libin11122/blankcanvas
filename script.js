let cart = [];

const buttons = document.querySelectorAll('button');
const cartCount = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items');

// Track which items are in the cart using their name
let inCart = {};

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const product = button.parentElement;
    const name = product.querySelector('h3').innerText;
    const price = product.querySelector('p').innerText;
    const imageSrc = product.querySelector('img').getAttribute('src');

    // If already in cart → remove it
    if (inCart[name]) {
      // Remove from cart array
      cart = cart.filter(item => item.name !== name);
      inCart[name] = false;

      // Reset button
      button.innerText = "Add to Cart";
      button.disabled = false;
      button.style.backgroundColor = "#000";

      updateCart();
    } else {
      // Add to cart
      cart.push({ name, price, imageSrc });
      inCart[name] = true;

      button.innerText = "In the Cart ✅";
      button.disabled = true;
      button.style.backgroundColor = "#28a745";

      updateCart();
    }
  });
});

function updateCart() {
  cartCount.innerText = cart.length;
  cartItemsList.innerHTML = "";

  cart.forEach((item) => {
    const itemCard = document.createElement("div");
    itemCard.classList.add("product");

    itemCard.innerHTML = `
      <img src="${item.imageSrc}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.price}</p>
      <button class="remove-button">Remove</button>
    `;

    // Add remove logic
    itemCard.querySelector(".remove-button").addEventListener("click", () => {
      // Remove from cart
      cart = cart.filter(p => p.name !== item.name);
      inCart[item.name] = false;
      updateCart();

      // Reset original button
      buttons.forEach((btn) => {
        const btnName = btn.parentElement.querySelector("h3").innerText;
        if (btnName === item.name) {
          btn.innerText = "Add to Cart";
          btn.disabled = false;
          btn.style.backgroundColor = "#000";
        }
      });
    });

    cartItemsList.appendChild(itemCard);
  });

  if (cart.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.innerText = "No items yet.";
    cartItemsList.appendChild(emptyMsg);
  }
}
