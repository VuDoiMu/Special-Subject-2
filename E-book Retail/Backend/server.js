
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./configs/dbCon');
const path = require('path');

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
app.get("/", (req, res) => {
    let data = "hello";
    res.render("home.pug", {
      data,
    });
  });
  app.get("/gio-hang", (req, res) => {
    res.render("gio-hang.pug", {
      title: "hello world",
    });
  });
  app.get("/product-list", (req, res) => {
    res.render("product-list.pug", {
      title: "hello world",
    });
  });
  app.get("/product", (req, res) => {
    res.render("product.pug", {
      title: "hello world",
    });
  });
  
  app.get("/tai-khoan", (req, res) => {
    res.render("tai-khoan.pug", {
      title: "hello world",
    });
  });

//routes
app.use('/management/', require('./routes/books'));
app.use('/order', require('./routes/order'));

mongoose.connection.once('open', () => {
    console.log('connected to MongoDb');
    app.listen(3500, () => console.log('Server running on port 3500!'));
});
