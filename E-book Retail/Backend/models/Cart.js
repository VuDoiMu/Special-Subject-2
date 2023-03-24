const mongoose  = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    items: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book' 
        },
          quantity: {
            type: Number
          },
          price: {
            type: Number
          },
          total:{
            type: Number
          }
        }
      ], 
    finalTotal: {
        type :  Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
      }
})
module.exports = mongoose.model("Cart", cartSchema);