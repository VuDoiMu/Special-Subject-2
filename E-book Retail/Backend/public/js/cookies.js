let btn = document
  .getElementById("buy-btn")
  .addEventListener("click", () => addToCart());

const addToCart = () => {
  const author = document.getElementById("author").innerHTML;
  const oldPrice = document.getElementById("old-price").innerHTML;
  const newPrice = document.getElementById("new-price").innerHTML;
  const img = document.getElementById("book-img").src;
  const bookName = document.getElementById("book-name").innerHTML;
  const id = document.getElementById("book-id").innerHTML;

  const item = { author, oldPrice, newPrice, image: img, name: bookName, id };

  // const itemId = // Get the item ID from the form or button
  // const itemName = // Get the item name from the form or button
  // const itemPrice = // Get the item price from the form or button

  //     // Add the new item to the client-side cart
  // const item = {
  //       id: itemId,

  //     };
  let cart = getCartFromCookie(); // Retrieve the cart from the cookie
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === item.id) {
      return;
    }
  }

  cart.push(item);

  // Update the cart on the client-side to reflect the newly added item
  // ...

  // Save the updated cart to the cookie
  setCartCookie(cart);
};

// This function retrieves the cart data from the cookie
function getCartFromCookie() {
  const cart = JSON.parse(getCookie("cart") || "[]");
  return cart;
}

// This function saves the cart data to the cookie
function setCartCookie(cart) {
  const expires = new Date(Date.now() + 86400000).toUTCString(); // Expire the cookie after 24 hours
  document.cookie = `cart=${JSON.stringify(cart)}; expires=${expires}; path=/`;
}

// This function retrieves a cookie by name
function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  if (match) {
    return match[2];
  }
  return null;
}
