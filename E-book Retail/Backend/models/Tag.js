const mongoose  = require("mongoose");

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    } ,
    description : {
        type :  String,
        require: true
    },
    books: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book' 
    }],
    createdAt: {
        type: Date,
        default: Date.now()
      }
})
module.exports = mongoose.model("Tag", tagSchema);