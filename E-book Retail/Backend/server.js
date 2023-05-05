const express = require("express");
const app = express();
const mongoose = require("mongoose");
const moment = require("moment");
const connectDB = require("./configs/dbCon");
const multer = require("multer");
const path = require("path");
const User = require("./models/User");
const data = require("./data/book.json");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const nodemailer = require("nodemailer");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const paginate = require("paginate-array");
const session = require("express-session");
const _ = require("lodash");

var Publishable_Key =
  "pk_test_51MwJlsK54HlkliE6zSFSgYLmzilMR8F8z4k9Uni8OvLAcvGv5kxi2LBjWfDMricBAPeDZEwVwHiwEWG3dgEbkX9Q00ljMiDta4";
var Secret_Key =
  "sk_test_51MwJlsK54HlkliE64ML0faNNckw90JTohQ7zN32WoD4sFA6MN9LHOKU7YTuUBrztB78SaVUveOGDHy5HGNLR2dJx00kpzqu040";

const stripe = require("stripe")(Secret_Key);

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use(cookieParser());

//connect to MongoDb
connectDB();

//decode req.body from form-data

// decode req.body from post body message
app.use(express.json());

// access to static file in public
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "bookContent")));
app.use(express.static(path.join(__dirname, "userContent")));
app.use(express.static("public", { "Content-Type": "application/javascript" }));
// set view engine and views
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.post("/payment", function (req, res) {
  const token = req.cookies.token;
  const cartcookie = JSON.parse(req.cookies.cart);
  const totalPrice = cartcookie.reduce(
    (acc, item) => acc + parseFloat(item.newPrice),
    0
  );
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: totalPrice * 100, // Charing Rs 25
        description: "Emanga",
        currency: "USD",
        customer: customer.id,
      });
    })
    .then(async (charge) => {
      const cookieValue = JSON.stringify([]);

      // Send email using Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "1901040026@s.hanu.edu.vn",
          pass: "1901040026",
        },
      });

      const mailOptions = {
        from: "1901040026@s.hanu.edu.vn",
        to: req.body.stripeEmail,
        subject: "Checkout Emanga",
        text: "Checkout successful",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.setHeader("Set-Cookie", `cart=${cookieValue};`);

      const decoded = jwt.verify(token, "thisisourwebsite!");
      const updateUser = await User.findById({ _id: decoded.userId });
      const newtoken = jwt.sign(
        {
          userId: updateUser._id,
          role: updateUser.role,
          username: updateUser.username,
          favorbooks: updateUser.favorbooks,
          inventory: updateUser.inventory,
          image: updateUser && updateUser.image,
        },
        "thisisourwebsite!"
      );
      res.cookie("token", newtoken);
      res.redirect("/?alert=Checkout+successfully");
    })
    .catch((err) => {
      res.send(err); // If some error occurs
    });
});

app.get("/gio-hang", async (req, res) => {
  const token = req.cookies.token;
  let tagData;
  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  let updateUser;
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
    // updateUser = await User.findById({ _id: decoded.userId });
    // const newtoken = jwt.sign(
    //   {
    //     userId: updateUser._id,
    //     role: updateUser.role,
    //     username: updateUser.username,
    //     favorbooks: updateUser.favorbooks,
    //     inventory: updateUser.inventory,
    //     image: updateUser && updateUser.image
    //   },
    //   "thisisourwebsite!"
    // );
    // res.cookie("token", newtoken);
  }
  const id = decoded.userId;

  const cookies = req.headers.cookie ? req.headers.cookie.split("; ") : [];
  let empty = true;
  let totalPrice = 0;
  if (JSON.parse(req.cookies.cart).length > 0) {
    const cartcookie = JSON.parse(req.cookies.cart);
    totalPrice = cartcookie.reduce(
      (acc, item) => acc + parseFloat(item.newPrice),
      0
    );
    const cart = cookies[1] + "";
    empty = false;
  }
  let cartNumber = 0;
  if (req.cookies.cart) cartNumber = JSON.parse(req.cookies.cart).length;

  const user = await User.findById(decoded.userId);
  res.render("gio-hang.pug", {
    empty,
    tags: tagData,
    decoded,
    token,
    user,
    totalPrice,
    cartNumber: cartNumber,
    image: updateUser && updateUser.image,
  });
});

app.get("/", async (req, res) => {
  const token = req.cookies.token;
  const alert = req.query.alert;
  let decoded = "";
  let updateUser;
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
    updateUser = await User.findById({ _id: decoded.userId });

    // const newtoken = jwt.sign(
    //   {
    //     userId: updateUser._id,
    //     role: updateUser.role,
    //     username: updateUser.username,
    //     favorbooks: updateUser.favorbooks,
    //     inventory: updateUser.inventory,
    //     image: updateUser && updateUser.image
    //   },
    //   "thisisourwebsite!"
    // );
    // res.cookie("token", newtoken);
  }
  const response = await axios.get("http://localhost:3500/management");
  const toplike = await axios.get("http://localhost:3500/catalog/toplike");
  const topSell = await axios.get("http://localhost:3500/catalog/topsell");
  const topSale = await axios.get("http://localhost:3500/catalog/topsale");
  const toplikeBook = toplike.data;
  const topsaleBook = topSale.data;
  const topsellBook = topSell.data;
  const userInfor = req.cookies.userInfor;
  let tagData;

  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));

  const data = response.data;
  let cartNumber = 0;
  if (req.cookies.cart) cartNumber = JSON.parse(req.cookies.cart).length;

  const user = await User.findById(decoded.userId);
  res.render("home.pug", {
    data,
    toplikeBook,
    topsaleBook,
    tags: tagData,
    topsellBook,
    token,
    decoded,
    user,
    alert,
    cartNumber: cartNumber,
    image: updateUser && updateUser.image,
  });
});

app.get("/tai-khoan", async (req, res) => {
  const token = req.cookies.token;
  let decoded = "";
  let updateUser;
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
    updateUser = await User.findById({ _id: decoded.userId });
    // const newtoken = jwt.sign(
    //   {
    //     userId: updateUser._id,
    //     role: updateUser.role,
    //     username: updateUser.username,
    //     favorbooks: updateUser.favorbooks,
    //     inventory: updateUser.inventory,
    //     image: updateUser && updateUser.image
    //   },
    //   "thisisourwebsite!"
    // );
    // res.cookie("token", newtoken);
  }
  let cartNumber = 0;
  if (req.cookies.cart) cartNumber = JSON.parse(req.cookies.cart).length;

  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  const user = await User.findById(decoded.userId);
  let orders = "";
  try {
    const response = await axios.get(
      "http://localhost:3500/order/" + decoded.userId
    );
    orders = response.data;
  } catch (error) {
    console.log(error);
  }

  res.render("tai-khoan.pug", {
    token,
    tags: tagData,
    decoded,
    user,
    orders,
    moment,
    cartNumber: cartNumber,
    image: updateUser && updateUser.image,
  });
});

app.get("/product/:id", async (req, res) => {
  const cartCookie = req.cookies.cart;
  let itemCount = 0;

  if (cartCookie) {
    const cart = JSON.parse(cartCookie);
    itemCount = Object.keys(cart).length;
  }

  const id = req.params.id;

  // Retrieve the book data from the backend API
  const response = await axios.get(`http://localhost:3500/management/${id}`);
  const book = response.data;

  // Retrieve the comments data from the backend API
  const commentsResponse = await axios.get(
    `http://localhost:3500/comment/${id}`
  );
  const comments = commentsResponse.data;

  // Retrieve the tag data from the backend API
  const tagResponse = await axios.get("http://localhost:3500/tag");
  const tagData = tagResponse.data.tags;

  const booksTag = [];
  // Retrieve the books associated with each tag
  for (const tagItem of book.tag) {
    const response = await axios.get(
      `http://localhost:3500/tag/books/${tagItem}`
    );
    if (response.data && response.data.books && response.data.books[0]) {
      const booksArray = response.data.books[0].books;
      if (booksArray != undefined) {
        booksTag.push(booksArray);
      }
    }
  }
  console.log(booksTag)
  const token = req.cookies.token;
  let decoded = "";
  let updateUser;
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
    updateUser = await User.findById({ _id: decoded.userId });
    // const newtoken = jwt.sign(
    //   {
    //     userId: updateUser._id,
    //     role: updateUser.role,
    //     username: updateUser.username,
    //     favorbooks: updateUser.favorbooks,
    //     inventory: updateUser.inventory,
    //     image: updateUser && updateUser.image
    //   },
    //   "thisisourwebsite!"
    // );
    // res.cookie("token", newtoken);
  }
  let cartNumber = 0;
  if (req.cookies.cart) cartNumber = JSON.parse(req.cookies.cart).length;

  const user = await User.findById(decoded.userId);
  res.render("product.pug", {
    book,
    comments,
    tags: tagData,
    booksTag,
    token,
    decoded,
    itemCount,
    moment,
    user,
    cartNumber: cartNumber,
    image: updateUser && updateUser.image,
  });
});

app.get("/tag/:name", async (req, res) => {
  const name = req.params.name;
  let singleTag = await axios.get(`http://localhost:3500/tag/get/${name}`);
  singleTag = singleTag.data.tag;

  const response = await axios.get(`http://localhost:3500/tag/books/${name}`);
  // console.log(response.data)
  let booksTag = [];
  if (response.data && response.data.books[0]) {
    booksTag = response.data.books[0].books;
  }
  const sortType = req.query.sortType;
  const isTag = true;
  if (sortType == "priceAsc") {
    booksTag = _.orderBy(booksTag, ["price"], ["asc"]);
  }
  if (sortType == "priceDesc") {
    booksTag = _.orderBy(booksTag, ["price"], ["desc"]);
  }
  if (sortType == "dateDesc") {
    booksTag = _.orderBy(booksTag, ["createdDate"], ["asc"]);
  }
  if (sortType == "nameAsc") {
    booksTag = _.orderBy(booksTag, ["name"], ["asc"]);
  }
  if (sortType == "nameDesc") {
    booksTag = _.orderBy(booksTag, ["name"], ["desc"]);
  }
  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  const token = req.cookies.token;
  let decoded = "";
  let updateUser;
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
    updateUser = await User.findById({ _id: decoded.userId });
    // const newtoken = jwt.sign(
    //   {
    //     userId: updateUser._id,
    //     role: updateUser.role,
    //     username: updateUser.username,
    //     favorbooks: updateUser.favorbooks,
    //     inventory: updateUser.inventory,
    //     image: updateUser && updateUser.image
    //   },
    //   "thisisourwebsite!"
    // );
    // res.cookie("token", newtoken);
  }
  let cartNumber = 0;
  if (req.cookies.cart) cartNumber = JSON.parse(req.cookies.cart).length;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const paginatedBooks = paginate(booksTag, page, limit);
  const user = await User.findById(decoded.userId);
  res.render("product-list.pug", {
    decoded,
    booksTag: paginatedBooks.data,
    currentPage: paginatedBooks.currentPage,
    totalPages: paginatedBooks.totalPages,
    tags: tagData,
    name,
    token,
    sortType,
    limit,
    isTag,
    user,
    cartNumber: cartNumber,
    singleTag,
    image: updateUser && updateUser.image,
  });
});

app.get("/search/:searchPara?/:page?", async (req, res) => {
  const searchPara = req.params.searchPara;

  await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  const response = await axios.get(
    "http://localhost:3500/catalog/search/" + searchPara
  );
  const token = req.cookies.token;
  let decoded = "";
  let updateUser;
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
    updateUser = await User.findById({ _id: decoded.userId });
    // const newtoken = jwt.sign(
    //   {
    //     userId: updateUser._id,
    //     role: updateUser.role,
    //     username: updateUser.username,
    //     favorbooks: updateUser.favorbooks,
    //     image: updateUser && updateUser.image
    //   },
    //   "thisisourwebsite!"
    // );
    // res.cookie("token", newtoken);
  }
  let booksTag = response.data;
  const sortType = req.query.sortType;
  if (sortType == "priceAsc") {
    booksTag = _.orderBy(booksTag, ["price"], ["asc"]);
  }
  if (sortType == "priceDesc") {
    booksTag = _.orderBy(booksTag, ["price"], ["desc"]);
  }
  if (sortType == "dateDesc") {
    booksTag = _.orderBy(booksTag, ["createdDate"], ["asc"]);
  }
  if (sortType == "nameAsc") {
    booksTag = _.orderBy(booksTag, ["name"], ["asc"]);
  }
  if (sortType == "nameDesc") {
    booksTag = _.orderBy(booksTag, ["name"], ["desc"]);
  }
  let cartNumber = 0;
  if (req.cookies.cart) cartNumber = JSON.parse(req.cookies.cart).length;

  const page = parseInt(req.params.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const paginatedBooks = paginate(booksTag, page, limit);
  const user = await User.findById(decoded.userId);
  res.render("product-list.pug", {
    tags: tagData,
    booksTag: paginatedBooks.data,
    currentPage: paginatedBooks.currentPage,
    totalPages: paginatedBooks.totalPages,
    limit,
    searchPara,
    token,
    decoded,
    sortType,
    user,
    cartNumber: cartNumber,
    image: updateUser && updateUser.image,
  });
});

app.get("/product-list/:name?/:page?", async (req, res) => {
  let books = "";
  if (req.params.name != "general-book") {
    const name = req.params.name;
    const response = await axios.get(`http://localhost:3500/catalog/${name}`);
    books = response.data;
  } else {
    const response = await axios.get(`http://localhost:3500/management`);
    books = response.data;
  }

  const sortType = req.query.sortType;
  if (sortType == "priceAsc") {
    books = _.orderBy(books, ["price"], ["asc"]);
  }
  if (sortType == "priceDesc") {
    books = _.orderBy(books, ["price"], ["desc"]);
  }
  if (sortType == "dateDesc") {
    books = _.orderBy(books, ["createdDate"], ["asc"]);
  }
  if (sortType == "nameAsc") {
    books = _.orderBy(books, ["name"], ["asc"]);
  }
  if (sortType == "nameDesc") {
    books = _.orderBy(books, ["name"], ["desc"]);
  }

  const page = parseInt(req.params.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const paginatedBooks = paginate(books, page, limit);
  //
  const token = req.cookies.token;
  let decoded = "";
  let updateUser;
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
    updateUser = await User.findById({ _id: decoded.userId });
    // const newtoken = jwt.sign(
    //   {
    //     userId: updateUser._id,
    //     role: updateUser.role,
    //     username: updateUser.username,
    //     favorbooks: updateUser.favorbooks,
    //     image: updateUser && updateUser.image
    //   },
    //   "thisisourwebsite!"
    // );
    // res.cookie("token", newtoken);
  }
  let cartNumber = 0;
  if (req.cookies.cart) cartNumber = JSON.parse(req.cookies.cart).length;

  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  const user = await User.findById(decoded.userId);
  res.render("product-list.pug", {
    booksTag: paginatedBooks.data,
    currentPage: paginatedBooks.currentPage,
    totalPages: paginatedBooks.totalPages,
    tags: tagData,
    name: req.params.name,
    token,
    decoded,
    sortType,
    limit,
    user,
    cartNumber: cartNumber,
    image: updateUser && updateUser.image,
  });
});

app.get("/admin/dashboard/:page", async (req, res) => {
  const response = await axios.get("http://localhost:3500/management");
  const data = response.data;
  const user = await axios.get("http://localhost:3500/auth/getAllUser");
  const userData = user.data;
  const discount = await axios.get("http://localhost:3500/discount");
  const disData = discount.data;
  const topSell = await axios.get("http://localhost:3500/catalog/topsell");
  const topsellBook = topSell.data;
  const order = await axios.get("http://localhost:3500/order");
  const orderData = order.data;
  let totalBooks = 0;
  let totalProfits = 0;
  for (let i = 0; i < orderData.length; i++) {
    totalBooks += orderData[i].items.length;
    totalProfits += orderData[i].finalTotal;
  }

  for (let i = 0; i < orderData.length; i++) {
    let user = await axios.get(
      "http://localhost:3500/auth/getUser/" + orderData[i].userId
    );
    user = user.data;
    orderData[i] = { ...orderData[i], userId: user };
  }
  const page = parseInt(req.params.page) || 1;
  const limit = 10;
  const paginatedBooks = paginate(topsellBook, page, limit);
  res.render("admin-home.pug", {
    data,
    userData,
    disData,
    orders: orderData.reverse().slice(0, 10),
    topsellBook: paginatedBooks.data,
    currentPage: paginatedBooks.currentPage,
    totalPages: paginatedBooks.totalPages,
    totalBooks,
    totalProfits,
    moment,
  });
});

app.get("/admin/sale", async (req, res) => {
  const order = await axios.get("http://localhost:3500/order");
  const orderData = order.data;
  let totalBooks = 0;
  let totalProfits = 0;
  for (let i = 0; i < orderData.length; i++) {
    totalBooks += orderData[i].items.length;
    totalProfits += orderData[i].finalTotal;
  }

  for (let i = 0; i < orderData.length; i++) {
    let user = await axios.get(
      "http://localhost:3500/auth/getUser/" + orderData[i].userId
    );
    user = user.data;
    orderData[i] = { ...orderData[i], userId: user };
  }

  res.render("admin-sale.pug", {
    orderData: orderData.reverse(),
    totalBooks,
    totalProfits,
    moment,
  });
});

app.get("/admin/login", (req, res) => {
  res.render("admin-login.pug");
});

app.get("/admin/management/:page", async (req, res) => {
  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  const tags = [];
  for (let i = 0; i < tagData.length; i++) {
    tags.push(tagData[i].name);
  }

  const response = await axios.get("http://localhost:3500/management");
  const data = response.data;
  const order = await axios.get("http://localhost:3500/order");
  const orderData = order.data;
  let totalBooks = 0;
  let totalProfits = 0;
  for (let i = 0; i < orderData.length; i++) {
    totalBooks += orderData[i].items.length;
    totalProfits += orderData[i].finalTotal;
  }
  const page = parseInt(req.params.page) || 1;
  const limit = 10;
  const paginatedBooks = paginate(data, page, limit);

  res.render("admin-management.pug", {
    data,
    books: paginatedBooks.data,
    currentPage: paginatedBooks.currentPage,
    totalPages: paginatedBooks.totalPages,
    orderData,
    tags,
    totalBooks,
    totalProfits,
  });
});
app.get("/admin/discount/:page", async (req, res) => {
  const discountData = await axios.get("http://localhost:3500/discount");
  const discounts = discountData.data.discounts;

  res.render("discount.pug", {
    discounts,
  });
});

app.get("/admin/category/:page", async (req, res) => {
  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));

  const response = await axios.get("http://localhost:3500/management");
  const data = response.data;
  const order = await axios.get("http://localhost:3500/order");
  const orderData = order.data;
  let totalBooks = 0;
  let totalProfits = 0;
  for (let i = 0; i < orderData.length; i++) {
    totalBooks += orderData[i].items.length;
    totalProfits += orderData[i].finalTotal;
  }
  const page = parseInt(req.params.page) || 1;
  const limit = 10;
  const paginatedBooks = paginate(data, page, limit);
  // console.log("Tag in here");
  // console.log(tag);
  // for(let i = 0; i < tag.length; i++) {
  //   const apiTagBooks = "http://localhost:3500/tag/books/" + tag[i].name;
  //   try {
  //   const response = await axios.get(apiTagBooks);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  res.render("admin-category.pug", {
    data,
    books: paginatedBooks.data,
    currentPage: paginatedBooks.currentPage,
    totalPages: paginatedBooks.totalPages,
    orderData,
    tagData: tag,
    totalBooks,
    totalProfits,
  });
});

app.get("/admin/add-book", async (req, res) => {
  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  const tags = [];
  for (let i = 0; i < tagData.length; i++) {
    tags.push(tagData[i].name);
  }
  const discountData = await axios.get("http://localhost:3500/discount");
  const discounts = discountData.data.discounts;
  const discountNames = [];
  for (let i = 0; i < discounts.length; i++) {
    discountNames.push(discounts[i].discountName);
  }
  const response = await axios.get("http://localhost:3500/management");
  const data = response.data;
  const order = await axios.get("http://localhost:3500/order");
  const orderData = order.data;
  let totalBooks = 0;
  let totalProfits = 0;
  for (let i = 0; i < orderData.length; i++) {
    totalBooks += orderData[i].items.length;
    totalProfits += orderData[i].finalTotal;
  }

  res.render("add-book.pug", {
    discountNames,
    data,
    orderData,
    tags,
    totalBooks,
    totalProfits,
  });
});

app.get("/admin/update/:id", async (req, res) => {
  const discountData = await axios.get("http://localhost:3500/discount");
  const discounts = discountData.data.discounts;
  const discountNames = [];
  for (let i = 0; i < discounts.length; i++) {
    discountNames.push(discounts[i].discountName);
  }
  const id = req.params.id;
  const response = await axios.get(`http://localhost:3500/management/${id}`);
  const data = response.data;
  let tagData;
  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  const tags = [];
  for (let i = 0; i < tagData.length; i++) {
    tags.push(tagData[i].name);
  }

  res.render("update.pug", { book: data, tags, discountNames });
});

// THong tin tac gia + sach cua tac gia day
app.get("/author/:searchPara", async (req, res) => {
  const searchPara = req.params.searchPara;

  await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  const response = await axios.get(
    "http://localhost:3500/catalog/search/author/" + searchPara
  );

  const token = req.cookies.token;
  let decoded = "";
  let updateUser;
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
    updateUser = await User.findById({ _id: decoded.userId });
    // const newtoken = jwt.sign(
    //   {
    //     userId: updateUser._id,
    //     role: updateUser.role,
    //     username: updateUser.username,
    //     favorbooks: updateUser.favorbooks,
    //     image: updateUser && updateUser.image
    //   },
    //   "thisisourwebsite!"
    // );
    // res.cookie("token", newtoken);
  }
  let booksTag = response.data;
  const sortType = req.query.sortType;
  if (sortType == "priceAsc") {
    booksTag = _.orderBy(booksTag, ["price"], ["asc"]);
  }
  if (sortType == "priceDesc") {
    booksTag = _.orderBy(booksTag, ["price"], ["desc"]);
  }
  if (sortType == "dateDesc") {
    booksTag = _.orderBy(booksTag, ["createdDate"], ["asc"]);
  }
  if (sortType == "nameAsc") {
    booksTag = _.orderBy(booksTag, ["name"], ["asc"]);
  }
  if (sortType == "nameDesc") {
    booksTag = _.orderBy(booksTag, ["name"], ["desc"]);
  }

  const page = parseInt(req.params.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const paginatedBooks = paginate(booksTag, page, limit);
  const user = await User.findById(decoded.userId);
  res.render("product-list.pug", {
    tags: tagData,
    booksTag: paginatedBooks.data,
    currentPage: paginatedBooks.currentPage,
    totalPages: paginatedBooks.totalPages,
    limit,
    searchPara,
    token,
    decoded,
    sortType,
    user,
    image: updateUser && updateUser.image,
    authorPage: true,
  });
});

app.get("/read-book/:id", async (req, res) => {
  const cartCookie = req.cookies.cart;
  let itemCount = 0;

  if (cartCookie) {
    const cart = JSON.parse(cartCookie);
    itemCount = Object.keys(cart).length;
  }

  const id = req.params.id;

  // Retrieve the book data from the backend API
  const response = await axios.get(`http://localhost:3500/management/${id}`);
  const book = response.data;

  // Retrieve the comments data from the backend API
  const commentsResponse = await axios.get(
    `http://localhost:3500/comment/${id}`
  );
  const comments = commentsResponse.data;

  // Retrieve the tag data from the backend API
  const tagResponse = await axios.get("http://localhost:3500/tag");
  const tagData = tagResponse.data.tags;

  const booksTag = [];

  // Retrieve the books associated with each tag
  for (const tagItem of book.tag) {
    const response = await axios.get(
      `http://localhost:3500/tag/books/${tagItem}`
    );
    if (response.data.books[0]) {
      const booksArray = response.data.books[0].books;
      booksTag.push(booksArray);
    }
  }

  const token = req.cookies.token;
  let updateUser;
  let decoded = "";
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
    updateUser = await User.findById({ _id: decoded.userId });
    // const newtoken = jwt.sign(
    //   {
    //     userId: updateUser._id,
    //     role: updateUser.role,
    //     username: updateUser.username,
    //     favorbooks: updateUser.favorbooks,
    //     image: updateUser && updateUser.image
    //   },
    //   "thisisourwebsite!"
    // );
    // res.cookie("token", newtoken);
  }
  res.render("read-book.pug", {
    book,
    comments,
    tags: tagData,
    booksTag,
    token,
    decoded,
    itemCount,
    moment,
    image: updateUser && updateUser.image,
  });
});

// Handle files
const bookThings = require("./controllers/bookController");
const userThings = require("./controllers/userController");
app.post(
  "/uploadBook",
  upload.fields([{ name: "images" }, { name: "content-images" }]),
  bookThings.addBook
);

app.post(
  "/updateBook/:id",
  upload.fields([{ name: "images" }, { name: "content-images" }]),
  bookThings.updateBook
);

// app.post(
//   "/uploadAvatar",
//   upload.fields([{ name: "images" }, { name: "content-images" }]),
//   userThings.addImage
// );
app.post("/create-order", async (req, res) => {
  const cartItems = JSON.parse(req.cookies["cart"]);
  // console.log(cartItems[0]);
});

app.post(
  "/uploadAvatar",
  upload.single("avatar"),
  userThings.addImage,
  async (req, res) => {
    const decoded = jwt.verify(token, "thisisourwebsite!");
    const updateUser = await User.findById({ _id: decoded.userId });
    const newtoken = jwt.sign(
      {
        userId: updateUser._id,
        role: updateUser.role,
        username: updateUser.username,
        favorbooks: updateUser.favorbooks,
        inventory: updateUser.inventory,
        image: updateUser && updateUser.image,
      },
      "thisisourwebsite!"
    );
    res.cookie("token", newtoken);
  }
);

//routes
app.use("/comment", require("./routes/comment"));
app.use("/management", require("./routes/books"));
app.use("/order", require("./routes/order"));
app.use("/auth", require("./routes/user"));
app.use("/cart", require("./routes/cart"));
app.use("/tag", require("./routes/tag"));
app.use("/catalog", require("./routes/catalog"));
app.use("/discount", require("./routes/discount"));
app.use("/review", require("./routes/review"));
app.use("/read", require("./routes/read"));

mongoose.connection.once("open", () => {
  console.log("connected to MongoDb");
  app.listen(3500, () => console.log("Server running on port 3500!"));
});
