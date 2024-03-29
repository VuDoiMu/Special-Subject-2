$(function () {
  $(".khoisanpham").slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  //hieu ung header va nut backtotop
  $("#backtotop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 400);
  });

  $(window).scroll(function () {
    if ($("body,html").scrollTop() > 150) {
      $(".navbar").addClass("fixed-top");
    } else {
      $(".navbar").removeClass("fixed-top");
    }
  });

  $(window).scroll(function () {
    if ($("body,html").scrollTop() > 500) {
      $(".nutcuonlen").addClass("hienthi");
    } else {
      $(".nutcuonlen").removeClass("hienthi");
    }
  });

  // header form dangnhap dangky
  $(".nutdangnhap").click(function (e) {
    $("ul.tabs .tab-dangnhap").addClass("active");
  });
  $(".nutdangky").click(function (e) {
    $("ul.tabs .tab-dangky").addClass("active");
  });

  $("ul.tabs .tab-dangnhap").click(function (e) {
    $("ul.tabs .tab-dangnhap").addClass("active");
    $("ul.tabs .tab-dangky").removeClass("active");
  });

  $("ul.tabs .tab-dangky").click(function (e) {
    $("ul.tabs .tab-dangky").addClass("active");
    $("ul.tabs .tab-dangnhap").removeClass("active");
  });

  // form dangnhap dangky
  $(".tab-dangky").click(function (e) {
    $("#formdangnhap").removeClass("fade");
    $("#formdangky").removeClass("fade");
    $("#formdangnhap").modal("hide");
    $("#formdangky").modal("show");
  });
  $(".tab-dangnhap").click(function (e) {
    $("#formdangnhap").removeClass("fade");
    $("#formdangky").removeClass("fade");
    $("#formdangky").modal("hide");
    $("#formdangnhap").modal("show");
  });
  $(".close").click(function (e) {
    $(".modal").addClass("fade");
    $("ul.tabs .tab-dangnhap").removeClass("active");
    $("ul.tabs .tab-dangky").removeClass("active");
  });

  // thumb-img
  $(".thumb-img.thumb1").addClass("vienvang");
  $(".thumb-img").click(function (e) {
    $(".product-image").attr("src", this.src);
  });

  $(".thumb-img").click(function (e) {
    $(".thumb-img:not(:hover)").removeClass("vienvang");
    $(this).addClass("vienvang");
  });

  //btn-spin
  $(".btn-inc").click(function (e) {
    var strval = $(this).parent().prev().val();
    var val = parseInt(strval) + 1;
    $(this).parent().prev().attr("value", val);
  });
  $(".btn-dec").click(function (e) {
    var strval = $(this).parent().next().val();
    var val = parseInt(strval) - 1;
    if (val < 1) {
      $(this).parent().next().attr("value", 1);
    } else {
      $(this).parent().next().attr("value", val);
    }
  });

  // gui danh gia
  $(".formdanhgia").hide(200);
  $(".vietdanhgia").click(function (e) {
    $(".formdanhgia").toggle(200);
  });

  //rotate chevron
  $("#step1contentid").on("show.bs.collapse", function () {
    $(this).prev().addClass("active");
  });
  $("#step1contentid").on("hide.bs.collapse", function () {
    $(this).prev().removeClass("active");
  });
  $("#step2contentid").on("show.bs.collapse", function () {
    $(this).prev().addClass("active");
  });
  $("#step2contentid").on("hide.bs.collapse", function () {
    $(this).prev().removeClass("active");
  });
  $("#step3contentid").on("show.bs.collapse", function () {
    $(this).prev().addClass("active");
  });
  $("#step3contentid").on("hide.bs.collapse", function () {
    $(this).prev().removeClass("active");
  });

  // nut btn-shopping-without-signup
  $("#step1contentid").collapse("show");
  $(".btn-shopping-without-signup").click(function (e) {
    $("#step1contentid").collapse("hide");
    $("#step2contentid").collapse("show");
  });

  // validate
  $("#form-signup").validate({
    rules: {
      name: {
        required: true,
      },
      phone: {
        required: true,
        minlength: 8,
      },
      password: {
        required: true,
        minlength: 6,
      },
      confirm_password: {
        required: true,
        minlength: 6,
        equalTo: "#inputPassword",
      },
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      name: {
        required: "Vui lòng nhập họ và tên",
      },
      phone: {
        required: "Vui lòng nhập số điện thoại",
        minlength: "Số máy quý khách vừa nhập là số không có thực",
      },
      password: {
        required: "Vui lòng nhập mật khẩu",
        minlength: "Vui lòng nhập ít nhất 6 kí tự",
      },
      confirm_password: {
        required: "Vui lòng nhập lại mật khẩu",
        minlength: "Vui lòng nhập ít nhất 6 kí tự",
        equalTo: "Mật khẩu không trùng",
      },
      email: {
        required: "Vui lòng nhập email",
        minlength: "Email không hợp lệ",
        email: "Vui lòng nhập email",
      },
    },
  });

  $("#form-signin").validate({
    rules: {
      password: {
        required: true,
        minlength: 6,
      },
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      password: {
        required: "Vui lòng nhập mật khẩu",
        minlength: "Vui lòng nhập ít nhất 6 kí tự",
      },
      email: {
        required: "Vui lòng nhập email",
        minlength: "Email không hợp lệ",
        email: "Vui lòng nhập email",
      },
    },
  });

  $("#form-signup-cart").validate({
    rules: {
      name: {
        required: true,
      },
      phone: {
        required: true,
        minlength: 8,
      },
      password: {
        required: true,
        minlength: 6,
      },
      confirm_password: {
        required: true,
        minlength: 6,
        equalTo: "#inputPassword",
      },
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      name: {
        required: "Vui lòng nhập họ và tên",
      },
      phone: {
        required: "Vui lòng nhập số điện thoại",
        minlength: "Số máy quý khách vừa nhập là số không có thực",
      },
      password: {
        required: "Vui lòng nhập mật khẩu",
        minlength: "Vui lòng nhập ít nhất 6 kí tự",
      },
      confirm_password: {
        required: "Vui lòng nhập lại mật khẩu",
        minlength: "Vui lòng nhập ít nhất 6 kí tự",
        equalTo: "Mật khẩu không trùng",
      },
      email: {
        required: "Vui lòng nhập email",
        minlength: "Email không hợp lệ",
        email: "Vui lòng nhập email",
      },
    },
  });

  $("#form-signin-cart").validate({
    rules: {
      password: {
        required: true,
        minlength: 6,
      },
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      password: {
        required: "Vui lòng nhập mật khẩu",
        minlength: "Vui lòng nhập ít nhất 6 kí tự",
      },
      email: {
        required: "Vui lòng nhập email",
        minlength: "Email không hợp lệ",
        email: "Vui lòng nhập email",
      },
    },
  });

  // add to cart
  let product = {
    name: $(".khoithongtin .ten").text(),
    tag: $(".product-image").attr("alt"),
    price: parseFloat($(".gia span.giamoi").text()),
    old_price: parseFloat($(".gia span.giacu").text()),
    inCart: 0,
  };

  let carts = document.querySelector(".nutmua");
  if (carts) {
    carts.addEventListener("click", () => {
      cartNumbers(product);
      totalCost(product);
    });
  }

  function onLoadCartNumbers() {
    let cartItems = getCookie("cart");
    cartItems = JSON.parse(cartItems);
    let productNumbers = cartItems.length;
    if (productNumbers === 0) {
      document.querySelector(".giohang .cart-amount").textContent = 0;
    }
    if (productNumbers !== 0) {
      document.querySelector(".giohang .cart-amount").textContent =
        productNumbers;
    }
  }

  function cartNumbers(product) {
    let cartItems = getCookie("cart");

    cartItems = JSON.parse(cartItems);
    let productNumbers = cartItems.length;
    productNumbers = parseInt(productNumbers);

    if (productNumbers !== 0) {
      localStorage.setItem("cartNumbers", productNumbers);
      const cartAmountValue = parseInt(
        document.querySelector(".giohang .cart-amount").textContent
      );
      if (cartAmountValue != productNumbers) {
        showToast("Add to cart successfully");
      }
      document.querySelector(".giohang .cart-amount").textContent =
        productNumbers;
    } else {
      localStorage.setItem("cartNumbers", parseInt($(".soluongsp").val()));
      document.querySelector(".giohang .cart-amount").textContent = parseInt(
        $(".soluongsp").val()
      );
    }
    setItem(product);
  }

  function setItem(product) {
    let cartItems = getCookie("cart");
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
      if (cartItems[product.tag] == undefined) {
        cartItems = {
          ...cartItems,
          [product.tag]: product,
        };
      }
      cartItems[product.tag].inCart += parseInt($(".soluongsp").val());
    } else {
      product.inCart = parseInt($(".soluongsp").val());
      cartItems = {
        [product.tag]: product,
      };
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  }

  function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");

    if (cartCost != null) {
      cartCost = parseFloat(cartCost);
      localStorage.setItem(
        "totalCost",
        cartCost + parseInt($(".soluongsp").val()) * product.price
      );
    } else {
      localStorage.setItem(
        "totalCost",
        parseInt($(".soluongsp").val()) * product.price
      );
    }
  }
  function getCookie(name) {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    if (match) {
      return match[2];
    }
    return null;
  }

  function displayCart() {
    let cartItems = getCookie("cart");
    if (cartItems) {
      cartItems = JSON.parse(cartItems);
    } else {
      cartItems = JSON.parse([]);
    }
    let totalProfits = 0;

    for (let i = 0; i < cartItems.length; i++) {
      totalProfits += cartItems[i].newPrice.split(" ")[1] * 1;
    }
    let cartContent = document.querySelector(".cart-content");
    let cartCost = totalProfits;

    let productNumbers = cartItems.length;

    // if (cartItems == null) {
    //   $(".cart-empty").removeClass("d-none");
    //   $(".cart").addClass("d-none");
    //   $(".cart-steps").addClass("d-none");
    // }
    // if (cartItems && cartContent) {
    $(".cart-empty").addClass("d-none");
    $(".cart").removeClass("d-none");
    $(".cart-steps").removeClass("d-none");

    cartContent.innerHTML = "";
    if (cartItems.length == 0) {
      cartContent.innerHTML += `
          <div class="empty-cart-container">
            <img alt="Giỏ hàng trống" src="https://mngroup2801.abaha.vn/assets/images/no-cart.png"/>
            <p> Your cart is empty</p>
            <a href="/" class="btn nutmuathem mb-3">Buy something</a>
          </div>
        `;
    } else {
      cartContent.innerHTML += `
            <h6 class="header-gio-hang">GIỎ HÀNG CỦA BẠN <span>(${cartItems.length} sản phẩm)</span></h6>
            <div class="cart-list-items">
            `;
      console.log(cartItems);
      console.log(Object.values(cartItems));
      Object.values(cartItems).map((item) => {
        cartContent.innerHTML += `
                    <div class="cart-item d-flex">
                        <a href="product/${item.id}" class="img">
                            <img src="${item.image}" class="img-fluid" alt="${
          item.tag
        }">
                        </a>
                        <div class="item-caption d-flex w-100">
                            <div class="item-info ml-3">
                                <a href="product/${item.id}" class="ten">${
          item.name
        }</a>
                              
                            </div>
                            <div class="item-price ml-auto d-flex flex-column align-items-end">
                                <div class="giamoi">${parseFloat(
                                  item.newPrice
                                )} $</div>
                                <div class="giacu">${parseFloat(
                                  item.oldPrice
                                )} $</div>
                                  <button class="trash-can" data-item-id=${
                                    item.id
                                  }>X </button>
                            </div>
                        </div>
                    </div>
                    <hr>
                `;
      });

      cartContent.innerHTML += `
            </div>

            <div class="row">
                <div class="col-md-3">
                    <a href="/" class="btn nutmuathem mb-3">Mua thêm</a>
                </div>
                <div class="col-md-5 offset-md-4">
                    <div class="tonggiatien">
                        <div class="group d-flex justify-content-between">
                           
                        </div>
                      
                        <div class="group d-flex justify-content-between align-items-center">
                            <strong class="text-uppercase">Tổng cộng:</strong>
                            <p class="tongcong">${cartCost} $</p>
                        </div>
                        <small class="note d-flex justify-content-end text-muted">
                            (Giá đã bao gồm VAT)
                        </small>
                    </div>
                </div>
            </div>
            `;
    }
    const cartItem = document.querySelector(".cart-item");
    if (!cartItem) {
      const cart_steps = document.querySelector(".cart-steps");
      cart_steps.remove();
    }

    function removeFromCart(id) {
      let cartItems = JSON.parse(getCookie("cart"));

      cartItems = cartItems.filter((item) => item.id !== id + "");

      setCartCookie(cartItems);
    }
    cartContent.addEventListener("click", function (event) {
      // Check if the clicked element is a delete button
      if (event.target && event.target.matches(".trash-can")) {
        console.log("Trash can");
        // Get the ID of the item to remove from the data attribute
        const itemId = event.target.dataset.itemId;

        removeFromCart(itemId);

        // Update the UI
        displayCart();
        onLoadCartNumbers();
      }
    });

    window.addEventListener("load", function (event) {
      let removeButtons = document.getElementsByClassName("trash-can");

      for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener("click", function () {
          removeFromCart(this.name);
        });
      }
    });
  }

  //   let customButton = document.querySelector('.btn-checkout');

  // customButton.addEventListener('click', function() {
  //   var handler = StripeCheckout.configure({
  //     key: 'pk_test_51MwJlsK54HlkliE6zSFSgYLmzilMR8F8z4k9Uni8OvLAcvGv5kxi2LBjWfDMricBAPeDZEwVwHiwEWG3dgEbkX9Q00ljMiDta4',
  //     locale: 'auto',
  //     token: function(token) {
  //       fetch('/payment', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({token: token.id})
  //       })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log(data);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //     }
  //   });

  //   handler.open({
  //     name: 'Stripe',
  //     description: 'Buy EManga',
  //     amount: 7000,
  //     currency: 'USD',
  //     locale: "auto"
  //   });
  // });

  function setCartCookie(cart) {
    const expires = new Date(Date.now() + 86400000).toUTCString(); // Expire the cookie after 24 hours
    document.cookie = `cart=${JSON.stringify(
      cart
    )}; expires=${expires}; path=/`;
  }

  $(".btn-checkout").click(async (e) => {
    console.log("checkout");

    // Update the cart on the client-side to reflect the cleared cart
    // // ...
    // function getCookie(name) {
    //   const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    //   if (match) {
    //     return match[2];
    //   }
    //   return null;
    // }

    let cartItems = await JSON.parse(getCookie("cart"));
    await fetch("http://localhost:3500/cart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    });

    // Save the cleared cart to the cookie
  });

  //START
  // const addFunctionToRemoveButton = () => {
  //   window.addEventListener("load", function (event) {
  //     let removeButtons = document.getElementsByClassName("trash-can");
  //     for (let i = 0; i < removeButtons.length; i++) {
  //       removeButtons[i].addEventListener("click", function () {
  //         removeFromCart(this.name);
  //       });
  //     }
  //   });
  // };

  onLoadCartNumbers();
  displayCart();

  $(".items .row").isotope({
    itemSelector: ".item",
  });

  $(".tag a").click(function (e) {
    var tacgia = $(this).data("tacgia");

    if (tacgia == "all") {
      $(".items .row").isotope({ filter: "*" });
    } else {
      $(".items .row").isotope({ filter: tacgia });
    }
    return false;
  });

  $(".thay-doi-mk").hide();
  $("#changepass").click(function (e) {
    $(".thay-doi-mk").toggle(200);
  });
});

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  if (match) {
    return match[2];
  }
  return null;
}

let formdangnhap = document.querySelector("#formdangnhap");
if (formdangnhap) {
  formdangnhap.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;
    const sendData = await fetch("http://localhost:3500/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailValue, password: passwordValue }),
    });

    const expires = new Date(Date.now() + 86400000).toUTCString();
    document.cookie = `cart=${JSON.stringify(
      JSON.parse("[]")
    )}; expires=${expires}; path=/`;

    const content = await sendData.json();
    if (content.message === "Wrong email ") {
      email.classList.remove("valid");
      email.classList.add("error");

      let errorLabel = document.querySelector("#email-error");
      if (errorLabel) {
        // If label already exists, remove it
        errorLabel.parentNode.removeChild(errorLabel);
      }
      errorLabel = document.createElement("label");
      errorLabel.setAttribute("id", "email-error");
      errorLabel.setAttribute("class", "error");
      errorLabel.setAttribute("for", "email");
      errorLabel.innerText = "Wrong email";
      email.parentNode.insertBefore(errorLabel, email.nextSibling);
      return;
    } else if (content.message === " Wrong password") {
      password.classList.remove("valid");
      password.classList.add("error");
      const errorLabel = document.createElement("label");
      errorLabel.setAttribute("id", "password-error");
      errorLabel.setAttribute("class", "error");
      errorLabel.setAttribute("for", "password");
      errorLabel.innerText = "Wrong password";
      password.parentNode.insertBefore(errorLabel, password.nextSibling);
      return;
    }
    let currentUrl = window.location.href;
    // let toastContainer = document.getElementById("toast-container");
    // let toastMessage = document.getElementById("toast-message");

    // if (toastMessage) {
    //   toastMessage.innerHTML = "";
    // }

    // if (toastContainer) {
    //   toastContainer.style.display = "none";
    // }
    window.setTimeout(() => {
      if (content.role == 0) {
        showToast("Login successfully!");
        location.assign(currentUrl);
      } else {
        location.assign("/admin/dashboard/1");
      }
    }, 2);
  });
}

const logoutVar = document.querySelector("#logout");
if (logoutVar) {
  logoutVar.addEventListener("click", async (e) => {
    const sendData = await fetch("http://localhost:3500/auth/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const content = await sendData.json();
    let currentUrl = window.location.href;
    if (
      currentUrl.indexOf("/tai-khoan") !== -1 ||
      currentUrl.indexOf("/read-book") !== -1 ||
      currentUrl.indexOf("/gio-hang") !== -1
    ) {
      window.location.href = "/";
    } else {
      location.reload();
      location.assign(currentUrl);
    }
  });
}

const searchform = document.querySelector("#form-search");
if (searchform) {
  searchform.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchname = document.getElementById("search").value;
    window.setTimeout(() => {
      location.assign("/search/" + searchname + "/1?limit=10");
    }, 200);
  });
}

const formSignUp = document.querySelector("#form-signup");
if (formSignUp) {
}
document.querySelector("#form-signup").addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("signup-email");
  const passwordInput = document.getElementById("inputPassword");
  const confirmPasswordInput = document.getElementById("confirm_password");
  const usernameInput = document.getElementById("signup-username");

  const emailInputValue = document.getElementById("signup-email").value;
  const passwordInputValue = document.getElementById("inputPassword").value;
  const confirmPasswordInputValue =
    document.getElementById("confirm_password").value;
  const usernameInputValue = document.getElementById("signup-username").value;
  if (
    !emailInput.classList.contains("valid") ||
    !passwordInput.classList.contains("valid") ||
    !confirmPasswordInput.classList.contains("valid") ||
    !usernameInput.classList.contains("valid")
  ) {
    console.log("Error");
    return;
  }
  if (confirmPasswordInputValue === passwordInputValue) {
    const sendData = await fetch("http://localhost:3500/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInputValue,
        password: passwordInputValue,
        username: usernameInputValue,
      }),
    });
    const content = await sendData.json();
    if (content.message === "this email is already used!") {
      emailInput.classList.remove("valid");
      emailInput.classList.add("error");
      const errorLabel = document.createElement("label");
      errorLabel.setAttribute("id", "signup-email-error");
      errorLabel.setAttribute("class", "error");
      errorLabel.setAttribute("for", "signup-email");
      errorLabel.innerText = "This email is already used!";
      emailInput.parentNode.insertBefore(errorLabel, emailInput.nextSibling);
      return;
    }

    let currentUrl = window.location.href;
    showToast("Register successfully!");

    const expires = new Date(Date.now() + 86400000).toUTCString();
    document.cookie = `cart=${JSON.stringify(
      JSON.parse("[]")
    )}; expires=${expires}; path=/`;

    window.setTimeout(() => {
      location.assign(currentUrl);
    }, 200);
  }
});

function fetchProduct(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Handle the product data here
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

// toggle like

const likeButtons = document.querySelectorAll(".like");
likeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const bookId = $(button)
      .closest(".card")
      .find(".like i.fa-heart")
      .data("book-id");
    const heartIcon = button.querySelector("i.fa.fa-heart");
    if (heartIcon.classList.contains("active")) {
      heartIcon.classList.toggle("active");

      //bớt like
      $.ajax({
        type: "PUT",
        url: `http://localhost:3500/management/sublike/${bookId}`,
        success: function (result) {
          $(button)
            .closest(".card")
            .find(".countLike")
            .text("Favourite: " + (result.countLike - 1));

          const allCards = document.querySelectorAll(".card");
          allCards.forEach((card) => {
            const cardId =
              card.querySelector(".like i.fa-heart").dataset.bookId;
            if (cardId == bookId) {
              const heart = card.querySelector("i.fa.fa-heart");
              heart.classList.remove("active");
              const countLike = card.querySelector(".countLike");
              countLike.textContent = "Favourite: " + (result.countLike - 1);
            }
          });
        },
        error: function (xhr, status, error) {
          console.log(error);
        },
      });
    } else {
      console.log("Non-Active");
      heartIcon.classList.toggle("active");
      //thêm like
      $.ajax({
        type: "PUT",
        url: `http://localhost:3500/management/addlike/${bookId}`,
        success: function (result) {
          $(button)
            .closest(".card")
            .find(".countLike")
            .text("Favourite: " + (result.countLike + 1));

          const allCards = document.querySelectorAll(".card");
          allCards.forEach((card) => {
            const cardId =
              card.querySelector(".like i.fa-heart").dataset.bookId;
            if (cardId == bookId) {
              const heart = card.querySelector("i.fa.fa-heart");
              heart.classList.add("active");

              const countLike = card.querySelector(".countLike");
              countLike.textContent = "Favourite: " + (result.countLike + 1);
            }
          });
        },
        error: function (xhr, status, error) {
          console.log(error);
        },
      });
    }
  });
});

function showToast(message) {
  var toastContainer = document.getElementById("toast-container");
  var toastMessage = document.getElementById("toast-message");
  if (toastMessage) {
    toastMessage.innerHTML = message;
  }
  toastContainer.style.display = "block";
  toastMessage.style.opacity = "1";

  setTimeout(function () {
    toastMessage.style.opacity = "0";
    setTimeout(function () {
      toastContainer.style.display = "none";
    }, 500);
  }, 2000);
}

// Select limit page
const hienthiSelect = document.querySelector(".hienthi-select");
const sortSelect = document.querySelector(".sapxep-select");
if (hienthiSelect) {
  hienthiSelect.addEventListener("change", () => {
    const selectedValue = hienthiSelect.value;
    const selectedSort = sortSelect.value;
    const currentUrl = window.location.href;
    let urlWithoutParams = currentUrl.split("?")[0]; // remove any existing query parameters

    if (
      hienthiSelect.classList.contains("isTag") ||
      hienthiSelect.classList.contains("isAuthor")
    ) {
      const newUrl = `${urlWithoutParams}?page=1&limit=${selectedValue}&sortType=${selectedSort}`;
      location.assign(newUrl);
    } else {
      urlWithoutParams = urlWithoutParams.substring(
        0,
        urlWithoutParams.length - 2
      );
      const newUrl = `${urlWithoutParams}/1?limit=${selectedValue}&sortType=${selectedSort}`;
      location.assign(newUrl);
    }
  });
}

if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    const selectedValue = hienthiSelect.value;
    const selectedSort = sortSelect.value;
    const currentUrl = window.location.href;
    const urlWithoutParams = currentUrl.split("?")[0]; // remove any existing query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page"); // get the value of the 'page' parameter

    if (hienthiSelect.classList.contains("isTag")) {
      const newUrl = `${urlWithoutParams}?page=${pageParam}&limit=${selectedValue}&sortType=${selectedSort}`;
      location.assign(newUrl);
    } else {
      const newUrl = `${urlWithoutParams}?limit=${selectedValue}&sortType=${selectedSort}`;
      location.assign(newUrl);
    }
  });
}

function addEventListenerComment() {
  const editCommentButtons = document.querySelectorAll(".edit-comment");

  editCommentButtons.forEach((editCommentButton) => {
    editCommentButton.addEventListener("click", () => {
      const commentId = editCommentButton.dataset.commentId;
      const commentContent = document
        .querySelector(`#comment-${commentId}`)
        .textContent.trim();

      const editFormId = "#edit-form-" + commentId;

      const editForm = document.querySelector(editFormId);
      const editFormByClass = document.querySelector(".form-edit");

      const editFormInput = editForm.querySelector('input[name="content"]');
      editFormInput.value = commentContent;
      editForm.classList.remove("d-none");
    });
  });

  document.querySelectorAll(".form-edit").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const content = form.querySelector('input[name="content"]').value;
      const commentId = form.dataset.commentId;
      const bookId = form.dataset.bookId;

      try {
        const response = await fetch(`/comment/${bookId}/${commentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        });
        const updatedComment = await response.json();
        // Update the comment content on the page
        const commentElement = document.querySelector(`#comment-${commentId}`);
        commentElement.innerText = updatedComment.content;
        // Hide the edit form
        const editForm = document.querySelector(`#edit-form-${commentId}`);
        editForm.classList.add("d-none");
      } catch (error) {
        console.error(error);
      }
    });
  });

  // document.querySelectorAll('.delete-comment').forEach(btn => {
  //   btn.addEventListener('click', async () => {
  //     const commentId = btn.dataset.commentId;
  //     const bookId =btn.dataset.bookId;
  //     const response = await fetch(`/comment/${bookId}/${commentId}`, {
  //       method: 'DELETE'
  //     });
  //     if (response.ok) {
  //       const commentEl = document.getElementById(`comment-item${commentId}`);
  //       if(commentEl) {
  //         commentEl.remove();
  //       }
  //       const commentSection = document.querySelector("#comment-section");
  //       if (commentSection.children.length === 0) {
  //         const noCommentsEl = document.createElement('p');
  //         noCommentsEl.id = 'comment-empty';
  //         noCommentsEl.textContent = 'No comments yet.';
  //         commentSection.appendChild(noCommentsEl);
  //       }
  //     }
  //   });
  // });
  const confirmModal = document.getElementById("confirm-delete-modal");
  const confirmBtn = document.getElementById("delete-comment-confirm");
  const cancelBtn = document.getElementById("delete-comment-cancel");

  document.querySelectorAll(".delete-comment").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const commentId = btn.dataset.commentId;
      const bookId = btn.dataset.bookId;

      // Show the confirmation modal
      confirmModal.style.display = "block";

      const closeBtn = confirmModal.querySelector(".close-btn");

      confirmModal.addEventListener("click", function (event) {
        if (event.target === this) {
          confirmModal.style.display = "none";
        }
      });

      // window.addEventListener('click', function (event) {
      //   console.log("Click");
      //   if (confirmModal.style.display == "block") {
      //     if (event.target != confirmModal && !confirmModal.contains(event.target)) {
      //       confirmModal.style.display = 'none';
      //       console.log("Click2");
      //     }
      //   }
      //   console.log("Click3");
      // });

      // Add event listener for close button
      closeBtn.addEventListener("click", () => {
        confirmModal.style.display = "none";
        // document.body.style.overflow = 'auto';
      });

      // Handle the "Yes" button click
      confirmBtn.addEventListener("click", async () => {
        const response = await fetch(`/comment/${bookId}/${commentId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const commentEl = document.getElementById(`comment-item${commentId}`);
          if (commentEl) {
            commentEl.remove();
          }
          const commentSection = document.querySelector("#comment-section");
          if (commentSection.children.length === 0) {
            const noCommentsEl = document.createElement("p");
            noCommentsEl.id = "comment-empty";
            noCommentsEl.textContent = "No comments yet.";
            commentSection.appendChild(noCommentsEl);
          }
        }

        // Hide the confirmation modal
        confirmModal.style.display = "none";
      });

      // Handle the "No" button click
      cancelBtn.addEventListener("click", () => {
        // Hide the confirmation modal
        confirmModal.style.display = "none";
      });
    });
  });
}

addEventListenerComment();

const toggleCheckbox = document.querySelector("#toggle-password-change");
const thayDoiMk = document.querySelector(".thay-doi-mk");
if (toggleCheckbox) {
  toggleCheckbox.addEventListener("change", function () {
    if (this.checked) {
      thayDoiMk.style.display = "block";
    } else {
      thayDoiMk.style.display = "none";
    }
  });
}

const updateButton = document.querySelector(".button-capnhat");
if (updateButton) {
  updateButton.addEventListener("click", async () => {
    const fullNameInput = document.querySelector('input[name="account-hoten"]');
    const phoneInput = document.querySelector('input[name="account-phone"]');
    const dobInput = document.querySelector('input[name="account-dob"]');
    const mkmoiInput = document.querySelector('input[name="account-mkmoi"]');
    const imageAvatar = document.querySelector("#img-account");
    const avatarInput = document.querySelector(".avatar-img img");
    const xacnhanmkmoiInput = document.querySelector(
      'input[name="account-xacnhan-mkmoi"]'
    );
    const username = document.querySelector("#username");

    // HANDLE AVATAR

    const fileAvatar = document.querySelector("#file-cover");
    const file = fileAvatar.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    let imageData = await fetch(`http://localhost:3500/uploadAvatar`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Error:", error);
      });

    // check if new password and confirm password match
    if (mkmoiInput.value !== xacnhanmkmoiInput.value) {
      alert("New password and confirm password do not match");
      return;
    }

    const updateData = {
      username: fullNameInput.value,
      userPhone: phoneInput.value,
      dateOfBirth: dobInput.value,
      password: mkmoiInput.value,
    };
    fetch("http://localhost:3500/auth/updateInfo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Update successful");

          console.log("asd");
          mkmoiInput.value = "";
          xacnhanmkmoiInput.value = "";
          username.innerText = fullNameInput.value;

          // let imageUrl = imageData._id + "/" + file.name;
          // imageAvatar.src = imageUrl;
          // avatarInput.src = imageUrl;
          location.reload();
        } else {
          alert("Update failed");
        }
      })
      .catch((error) => {
        alert("Update failed");
        console.error("Error updating user info:", error);
      });
  });
}

const imgs = document.querySelectorAll(".read img");

imgs.forEach((img) => {
  img.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
});

// const fileInput = document.querySelector('#file-avatar');
// const previewImage = document.querySelector('#avatar-preview');
// fileInput.addEventListener('change', (event) => {
//   const file = event.target.files[0];
//   const url = URL.createObjectURL(file);
//   previewImage.src = url;
// });

const fileInput = document.querySelector("#file-cover");
const previewImage = document.querySelector("#preview-image");

previewImage.setAttribute("alt", "");
fileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    previewImage.setAttribute("src", reader.result);
  });

  reader.readAsDataURL(file);
});
