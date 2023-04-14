const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
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
          total: {
              type :  Number
          }
        }
      ],
      finalTotal:{ 
        type : Number
      },
    createdDate: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    }

})
module.exports = mongoose.model("Order", orderSchema);