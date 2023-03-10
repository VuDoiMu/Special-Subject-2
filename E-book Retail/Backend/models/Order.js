const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    cart: {
        type: [ObjectID],
        required: true,
    },
    custormerID: {
        type: ObjectID,
        required: true,
    },
    isPaid: {
        type: Boolean,
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