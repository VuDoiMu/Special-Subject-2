const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    cart: {
        type: [String],
        required: true,
    },
    custormerID: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedDate: {
        type: Date,
        default: () => Date.now(),
    }

})
module.exports = mongoose.model("Order", orderSchema);