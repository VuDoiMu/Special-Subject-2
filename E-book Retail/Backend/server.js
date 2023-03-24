const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./configs/dbCon");
const path = require("path");
const data = require("./data/book.json");
const cookieParser = require('cookie-parser');
const axios = require("axios");
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
  const data = response.data; 
  res.render("home.pug", {
    data,
  });
});

app.get("/gio-hang", (req, res) => {
  res.render("gio-hang.pug", {
    title: "hello world",
  });
});

// tim truyen theo the loai

app.get("/product-list", (req, res) => {
  const id = req.params.category;
  res.render("product-list.pug", {
    title: "hello world",
  });
});

// lay book theo id

app.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  const response = await axios.get("http://localhost:3500/management/" + id);
  const book = response.data;
  res.render("product.pug", {
    book,
  });
});

app.get("/tai-khoan", (req, res) => {
  res.render("tai-khoan.pug", {
    title: "hello world",
  });
});

app.get("/admin", (req, res) => {
  res.render("admin-home.pug");
});
app.get("/admin-management", (req, res) => {
  res.render("admin-management.pug", { data });
});

app.get("/admin-sale", (req, res) => {
  res.render("admin-sale.pug", { data });
});

//routes
app.use("/management", require("./routes/books"));
app.use("/order", require("./routes/order"));
app.use("/auth", require("./routes/user"));
app.use("/cart", require("./routes/cart"));
app.use("/tag", require("./routes/tag"))

mongoose.connection.once("open", () => {
  console.log("connected to MongoDb");
  app.listen(3500, () => console.log("Server running on port 3500!"));
});
