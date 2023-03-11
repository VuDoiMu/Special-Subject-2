
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./configs/dbCon');

//connect to MongoDb
connectDB();

//decode req.body from form-data
app.use(express.urlencoded({ extended: true }));

// decode req.body from post body message
app.use(express.json());

// serve static files
app.use(express.static('./public'));

//routes
app.use('/management/', require('./routes/books'));
app.use('/order', require('./routes/order'));

mongoose.connection.once('open', () => {
    console.log('connected to MongoDb');
    app.listen(3500, () => console.log('Server running on port 3500!'));
});
