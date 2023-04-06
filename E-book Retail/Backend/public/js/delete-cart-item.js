// function getCartFromCookie() {
//   const cart = JSON.parse(getCookie("cart") || "[]");
//   return cart;
// }

// // This function saves the cart data to the cookie
// function setCartCookie(cart) {
//   const expires = new Date(Date.now() + 86400000).toUTCString(); // Expire the cookie after 24 hours
//   document.cookie = `cart=${JSON.stringify(cart)}; expires=${expires}; path=/`;
// }

// // This function retrieves a cookie by name
// function getCookie(name) {
//   const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
//   if (match) {
//     return match[2];
//   }
//   return null;
// }
// function setCookie(name, value, days) {
//   var expires = "";
//   if (days) {
//     var date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     expires = "; expires=" + date.toUTCString();
//   }
//   document.cookie = name + "=" + (value || "") + expires + "; path=/";
// }
// function removeFromCart(id) {
//   let cartItems = JSON.parse(getCookie("cart"));

//   cartItems = cartItems.filter((item) => item.id !== id);

//   setCookie("cartItems", JSON.stringify(cartItems));

//   // Update the cart UI
//   updateCart();
// }

// window.addEventListener("load", function (event) {
//   removeButtons = document.getElementsByClassName("trash-can");
//   for (let i = 0; i < removeButtons.length; i++) {
//     removeButtons[i].addEventListener("click", function () {
//       removeFromCart(this.id);
//     });
//   }
// });
// console.log(getCookie("cart"));
