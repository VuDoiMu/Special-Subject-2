const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./configs/dbCon");
const path = require("path");
const data = require("./data/book.json");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const jwt = require("jsonwebtoken")

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

// routes for render pug files

// Frontend se gui email + password
// Backend kiem tra gui thong tin user + token neu hop le

// app.post("/login", (req, res) => {

// });

// Frontend se gui email + password + username
// Backend kiem tra gui thong tin user + token neu hop le

// app.post("/sign-up", (req, res) => {});

// The loai truyen
// sach duoc add vao moi nhat
// sach ban chay nhat
// sach danh gia nhieu nhat
app.get("/", async (req, res) => {
  const response = await axios.get("http://localhost:3500/management");
  const toplike = await axios.get("http://localhost:3500/catalog/toplike");
  const topSell = await axios.get("http://localhost:3500/catalog/topsell");
  const topSale = await axios.get("http://localhost:3500/catalog/topsale");
  const toplikeBook = toplike.data
  const topsaleBook = topSale.data
  const topsellBook = topSell.data
  const userInfor = req.cookies.userInfor;
  // console.log("fhbsldfhlsfhnsdfgh")
  // console.log(data)
  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));

  const data = response.data;
  // console.log(data)
  res.render("home.pug", {
    data,
    toplikeBook,
    topsaleBook,
    tags: tagData.slice(0, 11),
    topsellBook
  
  });
});

app.get("/gio-hang", async (req, res) => {
  const response = await axios.get("http://localhost:3500/cart");
  
const data = response.data;
  res.render("gio-hang.pug", {
    data
  });
});

// tim truyen theo the loai

// lay book theo idrs
app.get("/product/:id", async (req, res) => {
  const id = req.params.id;
   await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  const booksTag = [];
  const response = await axios.get("http://localhost:3500/management/" + id);
  const book = response.data;
  const tag = book.tag;
  for (const tagItem of tag) {
    const response = await axios.get(`http://localhost:3500/tag/books/${tagItem}`);
    if (response.data.books[0]) {
      const booksArray = response.data.books[0].books;
      booksTag.push(booksArray);
    }
  }
  console.log(booksTag);
  res.render("product.pug", {
    book,
    tags: tagData.slice(0, 11),
    booksTag
  });
});

app.get("/tag/:name", async (req, res) => {
  const name = req.params.name;
  const response = await axios.get(`http://localhost:3500/tag/books/${name}`);
  const booksTag = response.data.books[0].books;
  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  res.render("product-list.pug", {
    booksTag,
    tags: tagData.slice(0, 11),
    name
  });
});

app.get("/product-list/:name?", async (req, res) => {
  console.log("Calling product list")
  let booksTag = ""
  if (req.params.name) {
    const name = req.params.name;
    const response = await axios.get(`http://localhost:3500/catalog/${name}`);
    booksTag = response.data;
  }
  else {
    const response = await axios.get(`http://localhost:3500/management`);
    booksTag = response.data;
  }
  const tag = await axios
    .get("http://localhost:3500/tag")
    .then((res) => (tagData = res.data.tags));
  res.render("product-list.pug", {
    booksTag,
    tags: tagData.slice(0, 11),
    name: req.params.name || "General books" // set name to empty string if name is not provided
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
  res.render("admin-home.pug", {
    data, userData, disData
  });
});
app.get("/admin-management", async (req, res) => {
  const response = await axios.get("http://localhost:3500/management");
  const data = response.data;
  const order= await axios.get("http://localhost:3500/order");
  const orderData = order.data;
  res.render("admin-management.pug", { data, orderData });
});

app.get("/admin-sale", (req, res) => {
  res.render("admin-sale.pug", { data });
});

app.post("/login", async (req, res) => {
  
})

//routes
app.use("/management", require("./routes/books"));
app.use("/order", require("./routes/order"));
app.use("/auth", require("./routes/user"));
app.use("/cart", require("./routes/cart"));
app.use("/tag", require("./routes/tag"));
app.use("/catalog", require("./routes/catalog"));
app.use("/discount", require("./routes/discount"))
app.use("/review", require("./routes/review"))

mongoose.connection.once("open", () => {
  console.log("connected to MongoDb");
  app.listen(3500, () => console.log("Server running on port 3500!"));
});
