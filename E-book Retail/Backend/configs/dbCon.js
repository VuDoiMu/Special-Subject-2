const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
<<<<<<< HEAD
      "mongodb+srv://admin:pass123@unistuf.nze6bno.mongodb.net/test",
=======
      "mongodb+srv://admin:pass123@unistuf.nze6bno.mongodb.net/Emanga",
      // "mongodb+srv://root:root@cluster0.ujgarwx.mongodb.net/?retryWrites=true&w=majority",
>>>>>>> 285fac686d1d7729e6a537aadd2cfaf5751e1eb2
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
