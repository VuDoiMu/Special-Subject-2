const express = require("express");
const app = express();
const mongoose = require("mongoose");
const moment = require("moment");
const connectDB = require("./configs/dbCon");
const path = require("path");
const User = require("./models/User");
const data = require("./data/book.json");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const paginate = require("paginate-array");
const session = require("express-session");
const _ = require("lodash");
const upload = multer({ dest: "uploads/" });
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser());

//connect to MongoDb
connectDB();

//decode req.body from form-data
app.use(express.urlencoded({ extended: true }));

// decode req.body from post body message
app.use(express.json());

// access to static file in public
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public', { 'Content-Type': 'application/javascript' }));
// set view engine and views
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  const token = req.cookies.token;
  let decoded = "";
  // if(token) {
  //   decoded = jwt.verify(token, "thisisourwebsite!");
  //   const updateUser = await User.findById({ _id: decoded.userId });
  //   const newtoken = jwt.sign({userId: updateUser._id, role: updateUser.role, username: updateUser.username, favorbooks: updateUser.favorbooks},"thisisourwebsite!");
  //   res.cookie('token', newtoken);
  // }
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

  if (token) {
    decoded = token;
  }
  console.log(decoded);
  const user = await User.findById(decoded.userId);
  res.render("home.pug", {
    data,
    toplikeBook,
    topsaleBook,
    tags: tagData.slice(0, 11),
    topsellBook,
    token,
    decoded,
    user
  });
});

app.get("/gio-hang", async (req, res) => {
  const token = req.cookies.token;
  let tagData;
  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  const decoded = token
  const id = decoded.userId;
  const response = await axios.get("http://localhost:3500/cart/" + id);
  const data = response.data;
  const cookies = req.headers.cookie ? req.headers.cookie.split("; ") : [];
  let empty = false;
  const cart = cookies[1] + "";
  if (cart == "cart=[]") {
    empty = true;
  }
  const user = await User.findById(decoded.userId)
  res.render("gio-hang.pug", {
    data,
    empty,
    tags: tagData.slice(0, 11),
    decoded,
    token,
    user
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
    decoded = token
  }
  const user = await User.findById(decoded.userId)
  res.render("product.pug", {
    book,
    comments,
    tags: tagData.slice(0, 11),
    booksTag,
    token,
    decoded,
    itemCount,
    moment,
    user
  });
});

app.get("/tai-khoan", async (req, res) => {
  const token = req.cookies.token;
  let decoded = "";
  if (token) {
    decoded = token
  }
  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  const user = await User.findById(decoded.userId)
  console.log("User o day ne");
  console.log(user);
  console.log("User o day ne");
  res.render("tai-khoan.pug", {
    token,
    tags: tagData.slice(0, 11),
    decoded,
    user
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
    decoded = token
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const paginatedBooks = paginate(booksTag, page, limit);
  const user = await User.findById(decoded.userId)
  res.render("product-list.pug", {
    decoded,
    booksTag: paginatedBooks.data,
    currentPage: paginatedBooks.currentPage,
    totalPages: paginatedBooks.totalPages,
    tags: tagData.slice(0, 11),
    name,
    token,
    sortType,
    limit,
    isTag,
    user
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
    decoded = token
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
  const user = await User.findById(decoded.userId)
  res.render("product-list.pug", {
    tags: tagData.slice(0, 11),
    booksTag: paginatedBooks.data,
    currentPage: paginatedBooks.currentPage,
    totalPages: paginatedBooks.totalPages,
    limit,
    searchPara,
    token,
    decoded,
    sortType,
    user
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
    decoded = token
  }
  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  const user = await User.findById(decoded.userId)
  res.render("product-list.pug", {
    booksTag: paginatedBooks.data,
    currentPage: paginatedBooks.currentPage,
    totalPages: paginatedBooks.totalPages,
    tags: tagData.slice(0, 11),
    name: req.params.name,
    token,
    decoded,
    sortType,
    limit,
    user
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
    topsellBook: topsellBook.slice(0, 11),
    totalBooks,
    totalProfits,
  });
});

app.get("/admin/login", (req, res) => {
  res.render("admin-login.pug");
});

app.get("/admin/management", async (req, res) => {
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

  res.render("admin-management.pug", {
    data,
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

// Get all author data
app.get("/admin/author-list", async (req, res) => {
  const response = await axios.get("http://localhost:3500/management");
  const data = response.data;

  res.render("author-management.pug", {
    data,
  });
});

app.post("/create-order", async (req, res) => {
  const cartItems = JSON.parse(req.cookies["cart"]);
  console.log(cartItems[0]);
});

app.post("/test", upload.array("images", 5), (req, res) => {
  const files = req.files;
  console.log(req.formData);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = file.path;

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error reading file");
      } else {
        // Handle file data here
        console.log(data);
      }

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Deleted file ${filePath}`);
        }
      });
    });
  }

  res.send("Files uploaded!");
});
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
