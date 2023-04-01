const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./configs/dbCon");
const path = require("path");
const data = require("./data/book.json");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const paginate = require("paginate-array");
const session = require("express-session");
const _ = require("lodash");
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

// set view engine and views
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
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
  const token = req.cookies.token;
  let decoded = "";
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
  }

  res.render("home.pug", {
    data,
    toplikeBook,
    topsaleBook,
    tags: tagData.slice(0, 11),
    topsellBook,
    token,
    decoded,
  });
});

app.get("/gio-hang", async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, "thisisourwebsite!");
  const id = decoded.userId;
  const response = await axios.get("http://localhost:3500/cart/" + id);
  const data = response.data;
  res.render("gio-hang.pug", {
    data,
  });
});

app.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  const booksTag = [];
  const response = await axios.get("http://localhost:3500/management/" + id);
  const book = response.data;
  const tag = book.tag;

  const token = req.cookies.token;
  let decoded = "";
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
  }
  for (const tagItem of tag) {
    const response = await axios.get(
      `http://localhost:3500/tag/books/${tagItem}`
    );
    if (response.data.books[0]) {
      const booksArray = response.data.books[0].books;
      booksTag.push(booksArray);
    }
  }

  res.render("product.pug", {
    book,
    tags: tagData.slice(0, 11),
    booksTag,
    token,
    decoded,
  });
});

app.get("/tag/:name", async (req, res) => {
  const name = req.params.name;
<<<<<<< HEAD
  let booksTag = "";
  if(name) {
    const response = await axios.get(`http://localhost:3500/tag/books/${name}`);
    booksTag = response.data.books[0].books
  }
  
  const sortType = req.query.sortType;
  const isTag = true;
  if(sortType == "priceAsc"){
   booksTag = _.orderBy(booksTag, ['price'], ['asc']);
}
if(sortType == "priceDesc"){
  booksTag = _.orderBy(booksTag, ['price'], ['desc']);
}
if(sortType == "dateAsc"){
  booksTag = _.orderBy(booksTag, ['createdDate'], ['asc']);
}
if(sortType == "nameAsc"){
  booksTag = _.orderBy(booksTag, ['name'], ['asc']);
}
if(sortType == "nameDesc"){
  booksTag = _.orderBy(booksTag, ['name'], ['desc']);
}
=======
  const response = await axios.get(`http://localhost:3500/tag/books/${name}`);
  const booksTag = response.data.books[0].books;
  const sortType = req.query.sortType;
  const isTag = true;
  if (sortType == "priceAsc") {
    booksTag = _.orderBy(booksTag, ["price"], ["asc"]);
  }
  if (sortType == "priceDesc") {
    booksTag = _.orderBy(booksTag, ["price"], ["desc"]);
  }
  if (sortType == "dateDesc") {
    booksTags = _.orderBy(booksTag, ["createdDate"], ["asc"]);
  }
  if (sortType == "nameAsc") {
    booksTag = _.orderBy(booksTag, ["name"], ["asc"]);
  }
  if (sortType == "nameDesc") {
    booksTag = _.orderBy(booksTag, ["name"], ["desc"]);
  }
>>>>>>> 8b2fa4154f42b145263076562e9a3a69f467b7cb
  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  const token = req.cookies.token;
  let decoded = "";
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const paginatedBooks = paginate(booksTag, page, limit);
  res.render("product-list.pug", {
    booksTag: paginatedBooks.data,
    currentPage: paginatedBooks.currentPage,
    totalPages: paginatedBooks.totalPages,
    tags: tagData.slice(0, 11),
    name,
    token,
   
    limit,
    isTag,
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
  }
  const booksTag = response.data;
  const page = parseInt(req.params.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const paginatedBooks = paginate(booksTag, page, limit);
  res.render("product-list.pug", {
    tags: tagData.slice(0, 11),
    booksTag: paginatedBooks.data,
    currentPage: paginatedBooks.currentPage,
    totalPages: paginatedBooks.totalPages,
    limit,
    searchPara,
    token,
    decoded,
    // >>>>>>> 297d93eb1c2eaae85e9fc9e6a18a9a90c11bdb30
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

  const page = parseInt(req.params.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const paginatedBooks = paginate(books, page, limit);
  //
  const token = req.cookies.token;
  let decoded = "";
  if (token) {
    decoded = jwt.verify(token, "thisisourwebsite!");
  }
  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  res.render("product-list.pug", {
    booksTag: paginatedBooks.data,
    currentPage: paginatedBooks.currentPage,
    totalPages: paginatedBooks.totalPages,
    tags: tagData.slice(0, 11),
    name: req.params.name,
    token,
    decoded
  });
});

app.get("/tai-khoan", async (req, res) => {
  const response = await axios.get("http://localhost:3500/");
  res.render("tai-khoan.pug", {
    title: "hello world",
  });
});

app.get("/admin", async (req, res) => {
  const response = await axios.get("http://localhost:3500/management");
  const data = response.data;
  const user = await axios.get("http://localhost:3500/auth/getAllUser");
  const userData = user.data;
  const discount = await axios.get("http://localhost:3500/discount");
  const disData = discount.data;
  const topSell = await axios.get("http://localhost:3500/catalog/topsell");
  const topsellBook = topSell.data;
  const orders = await axios.get("http://localhost:3500/order");
  console.log(topsellBook);
  res.render("admin-home.pug", {
    data,
    userData,
    disData,
    orders: orders.data,
    topsellBook: topsellBook.slice(0, 11),
  });
});

app.get("/admin-management", async (req, res) => {
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
  console.log(orderData);
  res.render("admin-management.pug", { data, orderData, tags });
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

//routes
app.use("/management", require("./routes/books"));
app.use("/order", require("./routes/order"));
app.use("/auth", require("./routes/user"));
app.use("/cart", require("./routes/cart"));
app.use("/tag", require("./routes/tag"));
app.use("/catalog", require("./routes/catalog"));
app.use("/discount", require("./routes/discount"));
app.use("/review", require("./routes/review"));

mongoose.connection.once("open", () => {
  console.log("connected to MongoDb");
  app.listen(3500, () => console.log("Server running on port 3500!"));
});
