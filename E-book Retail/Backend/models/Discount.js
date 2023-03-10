const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
    name: {
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
        type: [ObjectId],
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
    },
    startingDate: {
        type: Date,
        required:true,
    },
    endingDate: {
        type: Date,
        required: true
    }
})
module.exports = mongoose.model("Discount", discountSchema);