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
        required: "Vui l??ng nh???p h??? v?? t??n",
      },
      phone: {
        required: "Vui l??ng nh???p s??? ??i???n tho???i",
        minlength: "S??? m??y qu?? kh??ch v???a nh???p l?? s??? kh??ng c?? th???c",
      },
      password: {
        required: "Vui l??ng nh???p m???t kh???u",
        minlength: "Vui l??ng nh???p ??t nh???t 6 k?? t???",
      },
      confirm_password: {
        required: "Vui l??ng nh???p l???i m???t kh???u",
        minlength: "Vui l??ng nh???p ??t nh???t 6 k?? t???",
        equalTo: "M???t kh???u kh??ng tr??ng",
      },
      email: {
        required: "Vui l??ng nh???p email",
        minlength: "Email kh??ng h???p l???",
        email: "Vui l??ng nh???p email",
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
        required: "Vui l??ng nh???p m???t kh???u",
        minlength: "Vui l??ng nh???p ??t nh???t 6 k?? t???",
      },
      email: {
        required: "Vui l??ng nh???p email",
        minlength: "Email kh??ng h???p l???",
        email: "Vui l??ng nh???p email",
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
        required: "Vui l??ng nh???p h??? v?? t??n",
      },
      phone: {
        required: "Vui l??ng nh???p s??? ??i???n tho???i",
        minlength: "S??? m??y qu?? kh??ch v???a nh???p l?? s??? kh??ng c?? th???c",
      },
      password: {
        required: "Vui l??ng nh???p m???t kh???u",
        minlength: "Vui l??ng nh???p ??t nh???t 6 k?? t???",
      },
      confirm_password: {
        required: "Vui l??ng nh???p l???i m???t kh???u",
        minlength: "Vui l??ng nh???p ??t nh???t 6 k?? t???",
        equalTo: "M???t kh???u kh??ng tr??ng",
      },
      email: {
        required: "Vui l??ng nh???p email",
        minlength: "Email kh??ng h???p l???",
        email: "Vui l??ng nh???p email",
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
        required: "Vui l??ng nh???p m???t kh???u",
        minlength: "Vui l??ng nh???p ??t nh???t 6 k?? t???",
      },
      email: {
        required: "Vui l??ng nh???p email",
        minlength: "Email kh??ng h???p l???",
        email: "Vui l??ng nh???p email",
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
    let productNumbers = localStorage.getItem("cartNumbers");
    if (productNumbers) {
      document.querySelector(".giohang .cart-amount").textContent =
        productNumbers;
    }
  }

  function cartNumbers(product) {
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
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
    let cartItems = localStorage.getItem("productsInCart");
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

  function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartContent = document.querySelector(".cart-content");
    let cartCost = localStorage.getItem("totalCost");
    let productNumbers = localStorage.getItem("cartNumbers");

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
            <h6 class="header-gio-hang">GI??? H??NG C???A B???N <span>(${productNumbers} s???n ph???m)</span></h6>
            <div class="cart-list-items">
            `;
      Object.values(cartItems).map((item) => {
        cartContent.innerHTML += `
                    <div class="cart-item d-flex">
                        <a href="product-item.html" class="img">
                            <img src="images/${
                              item.tag
                            }.jpg" class="img-fluid" alt="${item.tag}">
                        </a>
                        <div class="item-caption d-flex w-100">
                            <div class="item-info ml-3">
                                <a href="product-item.html" class="ten">${
                                  item.name
                                }</a>
                                <div class="soluong d-flex">
                                    <div class="input-number input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text btn-spin btn-dec">-</span>
                                        </div>
                                        <input type="text" value="${
                                          item.inCart
                                        }" class="soluongsp  text-center">
                                        <div class="input-group-append">
                                            <span class="input-group-text btn-spin btn-inc">+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item-price ml-auto d-flex flex-column align-items-end">
                                <div class="giamoi">${parseFloat(
                                  item.price
                                ).toFixed(3)} ???</div>
                                <div class="giacu">${parseFloat(
                                  item.old_price
                                ).toFixed(3)} ???</div>
                                <span class="remove mt-auto"><i class="far fa-trash-alt"></i></span>
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
                    <a href="index.html" class="btn nutmuathem mb-3">Mua th??m</a>
                </div>
                <div class="col-md-5 offset-md-4">
                    <div class="tonggiatien">
                        <div class="group d-flex justify-content-between">
                            <p class="label">T???m t??nh:</p>
                            <p class="tamtinh">${parseFloat(cartCost).toFixed(
                              3
                            )} ???</p>
                        </div>
                        <div class="group d-flex justify-content-between">
                            <p class="label">Gi???m gi??:</p>
                            <p class="giamgia">0 ???</p>
                        </div>
                        <div class="group d-flex justify-content-between">
                            <p class="label">Ph?? v???n chuy???n:</p>
                            <p class="phivanchuyen">0 ???</p>
                        </div>
                        <div class="group d-flex justify-content-between">
                            <p class="label">Ph?? d???ch v???:</p>
                            <p class="phidicvu">0 ???</p>
                        </div>
                        <div class="group d-flex justify-content-between align-items-center">
                            <strong class="text-uppercase">T???ng c???ng:</strong>
                            <p class="tongcong">${parseFloat(cartCost).toFixed(
                              3
                            )} ???</p>
                        </div>
                        <small class="note d-flex justify-content-end text-muted">
                            (Gi?? ???? bao g???m VAT)
                        </small>
                    </div>
                </div>
            </div>
            `;
    }
  }

  $(".btn-checkout").click(function (e) {
    localStorage.clear();
    location.reload(true);
    alert("c???m ??n ???? mua h??ng");
  });

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

document
  .querySelector("#formdangnhap")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
    const sendData = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const content = await sendData.json();

    window.setTimeout(() => {
      location.assign("/");
    }, 1000);
  });

document.querySelector("#form-signup").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirm_password = document.getElementById("confirm_password").value;

  if (confirm_password === password) {
    const sendData = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const content = await sendData.json();
    console.log(email, password);
    window.setTimeout(() => {
      location.assign("/");
    }, 1000);
  }
});

function fetchProduct(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Handle the product data here
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
}
