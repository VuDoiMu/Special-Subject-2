let btn = document
  .getElementById("buy-btn")
  .addEventListener("click", () => addToCart);

const book = {}


function addToCart() {
    const itemId = // Get the item ID from the form or button
// const itemName = // Get the item name from the form or button
// const itemPrice = // Get the item price from the form or button

//     // Add the new item to the client-side cart
// const item = {
//       id: itemId,

//     };
    // let cart = getCartFromCookie(); // Retrieve the cart from the cookie
    cart.push(item);

    // Update the cart on the client-side to reflect the newly added item
    // ...

    // Save the updated cart to the cookie
    setCartCookie(cart);
  }

  // This function retrieves the cart data from the cookie
  function getCartFromCookie() {
    const cart = JSON.parse(getCookie('cart') || '[]');
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
