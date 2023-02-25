const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();

app.get("/", (req, res) => {
    //TODO
})

const catalogRouter = require('./routes/catalog');
const readRouter = require('./routes/read');
const userRouter = require("./routes/user");

app.use('/user', userRouter);

app.use('/catalog', catalogRouter);

app.use('/read', readRouter);

//index page


//connect to db 
async function startServer() {
    const client = await mongoose.connect("mongodb://127.0.0.1:27017/E-BookRetailer");
    console.log("Connected to database!");

    app.listen(3000);
    console.log("Listening on port 3000!");
}
startServer();