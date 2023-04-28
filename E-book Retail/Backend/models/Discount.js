const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
    discountName: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 3,
        maxLength: 100
    },
    discountRate: {
        type: Number,
        min: 1,
        max: 100,
        required: true
    },
    discountItem: {
        type: [ObjectId]
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
module.exports = mongoose.model("Discount", discountSchema);