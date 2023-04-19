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
app.use(express.static("public", { "Content-Type": "application/javascript" }));
// set view engine and views
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.post('/payment', function(req, res){ 
  const cartcookie = JSON.parse(req.cookies.cart)
  const totalPrice = cartcookie.reduce((acc, item) => acc + parseFloat(item.newPrice), 0);
	// Moreover you can take more details from user 
	// like Address, Name, etc from form 
	stripe.customers.create({ 
		email: req.body.stripeEmail, 
		source: req.body.stripeToken, 

	}) 
	.then((customer) => { 

		return stripe.charges.create({ 
			amount: (totalPrice*100),	 // Charing Rs 25 
			description: 'Emanga', 
			currency: 'USD', 
			customer: customer.id 
		}); 
	}) 
	.then(async (charge) => { 
    
    const cookieValue = JSON.stringify([]);
    res.setHeader('Set-Cookie', `cart=${cookieValue};`);
		res.redirect("/?alert=Checkout+successfully");
	}) 
	.catch((err) => { 
		res.send(err)	 // If some error occurs 
	}); 
})

app.get("/gio-hang", async (req, res) => {
  const token = req.cookies.token;
  let tagData;
  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  const decoded = jwt.verify(token, "thisisourwebsite!");
  const id = decoded.userId;

  const cookies = req.headers.cookie ? req.headers.cookie.split("; ") : [];
  let empty = true;
  let totalPrice = 0;
  if (JSON.parse(req.cookies.cart).length > 0) {
    const cartcookie = JSON.parse(req.cookies.cart)
    totalPrice = cartcookie.reduce((acc, item) => acc + parseFloat(item.newPrice), 0);
    const cart = cookies[1] + "";
    empty = false;
  }
  let cartNumber = 0;
  if (req.cookies.cart)
  cartNumber = JSON.parse(req.cookies.cart).length

  const user = await User.findById(decoded.userId);
  res.render("gio-hang.pug", {
    empty,
    tags: tagData,
    decoded,
    token,
    user,
    totalPrice,
    cartNumber: cartNumber
  });
});

app.get("/", async (req, res) => {
  const token = req.cookies.token;
  const alert = req.query.alert;
  let decoded = "";
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
    const updateUser = await User.findById({ _id: decoded.userId });
    const newtoken = jwt.sign(
      {
        userId: updateUser._id,
        role: updateUser.role,
        username: updateUser.username,
        favorbooks: updateUser.favorbooks,
        inventory: updateUser.inventory,
      },
      "thisisourwebsite!"
    );
    res.cookie("token", newtoken);
  }
  const response = await axios.get("http://localhost:3500/management");
  const toplike = await axios.get("http://localhost:3500/catalog/toplike");
  const topSell = await axios.get("http://localhost:3500/catalog/topsell");
  const topSale = await axios.get("http://localhost:3500/catalog/topsale");
  const toplikeBook = toplike.data;
  const topsaleBook = topSale.data;
  const topsellBook = topSell.data;
  let tagData;
  const userInfor = req.cookies.userInfor;
  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));

  const data = response.data;
  let cartNumber = 0;
  if (req.cookies.cart)
  cartNumber = JSON.parse(req.cookies.cart).length

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
    cartNumber: cartNumber
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
    if (response.data.books[0]) {
      const booksArray = response.data.books[0].books;
      booksTag.push(booksArray);
    }
  }

  const token = req.cookies.token;
  let decoded = "";
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
    const updateUser = await User.findById({ _id: decoded.userId });
    const newtoken = jwt.sign(
      {
        userId: updateUser._id,
        role: updateUser.role,
        username: updateUser.username,
        favorbooks: updateUser.favorbooks,
        inventory: updateUser.inventory,
      },
      "thisisourwebsite!"
    );
    res.cookie("token", newtoken);
  }
  let cartNumber = 0;
  if (req.cookies.cart)
  cartNumber = JSON.parse(req.cookies.cart).length

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
    cartNumber: cartNumber
  });
});

app.get("/tai-khoan", async (req, res) => {
  const token = req.cookies.token;
  let decoded = "";
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
    const updateUser = await User.findById({ _id: decoded.userId });
    const newtoken = jwt.sign(
      {
        userId: updateUser._id,
        role: updateUser.role,
        username: updateUser.username,
        favorbooks: updateUser.favorbooks,
        inventory: updateUser.inventory,
      },
      "thisisourwebsite!"
    );
    res.cookie("token", newtoken);
  }
  let cartNumber = 0;
  if (req.cookies.cart)
  cartNumber = JSON.parse(req.cookies.cart).length

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
    cartNumber: cartNumber
  });
});

app.get("/tag/:name", async (req, res) => {
  const name = req.params.name;
  const response = await axios.get(`http://localhost:3500/tag/books/${name}`);
  let booksTag = response.data.books[0].books;
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
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
    const updateUser = await User.findById({ _id: decoded.userId });
    const newtoken = jwt.sign(
      {
        userId: updateUser._id,
        role: updateUser.role,
        username: updateUser.username,
        favorbooks: updateUser.favorbooks,
        inventory: updateUser.inventory,
      },
      "thisisourwebsite!"
    );
    res.cookie("token", newtoken);
  }
  let cartNumber = 0;
  if (req.cookies.cart)
  cartNumber = JSON.parse(req.cookies.cart).length

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
    cartNumber: cartNumber
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
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
    const updateUser = await User.findById({ _id: decoded.userId });
    const newtoken = jwt.sign(
      {
        userId: updateUser._id,
        role: updateUser.role,
        username: updateUser.username,
        favorbooks: updateUser.favorbooks,
      },
      "thisisourwebsite!"
    );
    res.cookie("token", newtoken);
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
  if (req.cookies.cart)
  cartNumber = JSON.parse(req.cookies.cart).length

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
    cartNumber: cartNumber
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
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
    const updateUser = await User.findById({ _id: decoded.userId });
    const newtoken = jwt.sign(
      {
        userId: updateUser._id,
        role: updateUser.role,
        username: updateUser.username,
        favorbooks: updateUser.favorbooks,
      },
      "thisisourwebsite!"
    );
    res.cookie("token", newtoken);
  }
  let cartNumber = 0;
  if (req.cookies.cart)
  cartNumber = JSON.parse(req.cookies.cart).length

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
    cartNumber: CartNumber
  });
});

app.get("/admin/dashboard", async (req, res) => {
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

  res.render("admin-home.pug", {
    data,
    userData,
    disData,
    orders: order.data,
    topsellBook: topsellBook,
    totalBooks,
    totalProfits,
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

app.get("/admin/add-book", async (req, res) => {
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

  res.render("add-book.pug", {
    data,
    orderData,
    tags,
    totalBooks,
    totalProfits,
  });
});

app.get("/admin/update/:id", async (req, res) => {
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

  res.render("update.pug", { book: data, tags });
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

  res.render("admin-sale.pug", { orderData, totalBooks, totalProfits });
});

app.post("/create-order", async (req, res) => {
  const cartItems = JSON.parse(req.cookies["cart"]);
  console.log(cartItems[0]);
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
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
    const updateUser = await User.findById({ _id: decoded.userId });
    const newtoken = jwt.sign(
      {
        userId: updateUser._id,
        role: updateUser.role,
        username: updateUser.username,
        favorbooks: updateUser.favorbooks,
      },
      "thisisourwebsite!"
    );
    res.cookie("token", newtoken);
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
  let decoded = "";
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
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
  });
});

// Handle files
const bookThings = require("./controllers/bookController");

app.post(
  "/upload",
  upload.fields([{ name: "images" }, { name: "content-images" }]),
  bookThings.addBook
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
