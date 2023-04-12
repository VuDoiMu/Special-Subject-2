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
    console.log(productNumbers);
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

    if (productNumbers.length !== 0) {
      localStorage.setItem(
        "cartNumbers",
        productNumbers + parseInt($(".soluongsp").val())
      );
      document.querySelector(".giohang .cart-amount").textContent =
        productNumbers + parseInt($(".soluongsp").val());
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
    cartItems = JSON.parse(cartItems);
    let totalProfits = 0;

    for (let i = 0; i < cartItems.length; i++) {
      totalProfits += cartItems[i].newPrice.split(" ")[1] * 1;
    }
    let cartContent = document.querySelector(".cart-content");
    let cartCost = totalProfits;

    let productNumbers = cartItems.lenght;

    if (cartItems == null) {
      $(".cart-empty").removeClass("d-none");
      $(".cart").addClass("d-none");
      $(".cart-steps").addClass("d-none");
    }
    if (cartItems && cartContent) {
      $(".cart-empty").addClass("d-none");
      $(".cart").removeClass("d-none");
      $(".cart-steps").removeClass("d-none");

      cartContent.innerHTML = "";

      cartContent.innerHTML += `
            <h6 class="header-gio-hang">GIỎ HÀNG CỦA BẠN <span>(${cartItems.length} sản phẩm)</span></h6>
            <div class="cart-list-items">
            `;
      Object.values(cartItems).map((item) => {
        cartContent.innerHTML += `
                    <div class="cart-item d-flex">
                        <a href="product/${item.id}" class="img">
                            <img src="${
                              item.image
                            }.jpg" class="img-fluid" alt="${item.tag}">
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
                       
                      
                        <div class="group d-flex justify-content-between">
                            <p class="label">Phí dịch vụ:</p>
                            <p class="phidicvu">0 ₫</p>
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
    function removeFromCart(id) {
      let cartItems = JSON.parse(getCookie("cart"));

      cartItems = cartItems.filter((item) => item.id !== id + "");

      setCartCookie(cartItems);
    }
    cartContent.addEventListener("click", function (event) {
      // Check if the clicked element is a delete button
      if (event.target && event.target.matches(".trash-can")) {
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

  function setCartCookie(cart) {
    const expires = new Date(Date.now() + 86400000).toUTCString(); // Expire the cookie after 24 hours
    document.cookie = `cart=${JSON.stringify(
      cart
    )}; expires=${expires}; path=/`;
  }
  $(".btn-checkout").click(async (e) => {
    let cart = []; // Create an empty cart

    // Update the cart on the client-side to reflect the cleared cart
    // ...
    function getCookie(name) {
      const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
      if (match) {
        return match[2];
      }
      return null;
    }

    let cartItems = await JSON.parse(getCookie("cart"));

    setCartCookie(cart);
    location.reload(true);
    alert("cảm ơn đã mua hàng");
    const sendData = await fetch("http://localhost:3500/create-order", {
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
let formdangnhap = document.querySelector("#formdangnhap");
if (formdangnhap) {
  formdangnhap.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;
    console.log(emailValue);
    console.log(passwordValue);
    const sendData = await fetch("http://localhost:3500/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailValue, password: passwordValue }),
    });
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
        location.assign("/admin/dashboard");
      }
    }, 200);
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
    console.log(content.username);
    let currentUrl = window.location.href;
    window.setTimeout(() => {
      location.reload();
      location.assign(currentUrl);
    }, 200);
  });
}

const searchform = document.querySelector("#form-search");
if (searchform) {
  searchform.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchname = document.getElementById("search").value;
    console.log(searchname);
    window.setTimeout(() => {
      location.assign("/search/" + searchname + "/1?limit=10");
    }, 200);
  });
}

// if (searchform) {
//   searchform.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const searchname =  document.getElementById("search").value;

//     console.log("grgfjhfktg56")
// const sendData = await fetch("http://localhost:3500/catalog/search" + searchname, {
//   method: "GET",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ name: searchname }),
// });
// const content = await sendData.json();
//     window.setTimeout(() => {
//       location.assign("/search/"+searchname);
//     }, 200);
//   });
// }

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
    console.log(content.message);
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
      console.log("Active");
      heartIcon.classList.toggle("active");
      //bớt like
      $.ajax({
        type: "PUT",
        url: `http://localhost:3500/management/sublike/${bookId}`,
        success: function (data) {
          $("#like-count-" + bookId).text("Favourite: " + (data.countLike - 1));
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
        success: function (data) {
          console.log(data);
          $("#like-count-" + bookId).text("Favourite: " + (data.countLike + 1));
        },
        error: function (xhr, status, error) {
          console.log(error);
        },
      });
    }

    // const emptyHeartIcon = button.querySelector("i.far.fa-heart");
    // if(emptyHeartIcon){
    //   console.log("empty heart icon active");
    // emptyHeartIcon.classList.toggle("active");
    // }
  });
});

function showToast(message) {
  var toastContainer = document.getElementById("toast-container");
  var toastMessage = document.getElementById("toast-message");
  if (toastMessage) {
    toastMessage.innerHTML = message;
  }
  console.log(toastContainer);
  console.log(toastMessage);
  toastContainer.style.display = "block";
  toastMessage.style.opacity = "1";

  setTimeout(function () {
    toastMessage.style.opacity = "0";
    setTimeout(function () {
      toastContainer.style.display = "none";
    }, 500);
  }, 5000);
}

// Select limit page
const hienthiSelect = document.querySelector(".hienthi-select");
const sortSelect = document.querySelector(".sapxep-select");
if (hienthiSelect) {
  hienthiSelect.addEventListener("change", () => {
    const selectedValue = hienthiSelect.value;
    const selectedSort = sortSelect.value;
    const currentUrl = window.location.href;
    const urlWithoutParams = currentUrl.split("?")[0]; // remove any existing query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page"); // get the value of the 'page' parameter
    console.log("pageParam:", pageParam); // add this line to log the value of pageParam

    if (hienthiSelect.classList.contains("isTag")) {
      const newUrl = `${urlWithoutParams}?page=${pageParam}&limit=${selectedValue}&sortType=${selectedSort}`;
      location.assign(newUrl);
    } else {
      const newUrl = `${urlWithoutParams}?limit=${selectedValue}&sortType=${selectedSort}`;
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
    console.log("pageParam:", pageParam); // add this line to log the value of pageParam

    if (hienthiSelect.classList.contains("isTag")) {
      const newUrl = `${urlWithoutParams}?page=${pageParam}&limit=${selectedValue}&sortType=${selectedSort}`;
      location.assign(newUrl);
    } else {
      const newUrl = `${urlWithoutParams}?limit=${selectedValue}&sortType=${selectedSort}`;
      location.assign(newUrl);
    }
  });
}

// const saxpepSelect = document.querySelector('.sapxep-select');
// if (saxpepSelect) {
//   saxpepSelect.addEventListener('change', () => {
//     const selectedValue = saxpepSelect.value;
//     const currentUrl = window.location.href;
//     const urlWithoutLimit = currentUrl.split('?')[0];
//     const newUrl = `${urlWithoutLimit}?sortType=${selectedValue}&limit=${selectedValue}`;
//     location.assign(newUrl);
//   });
// }
