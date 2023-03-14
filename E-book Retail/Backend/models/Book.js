const mongoose  = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 255,
        required: true,
        minLength: 1
    },
    cover: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
    },
    publisher: {
        type: String
    },
    pageCount: {
        type: Number,
    },
    saleRate: {
        type: Number
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: [String],
        required: true,
    },
    content: {
        type: Object,
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
module.exports = mongoose.model("Book", bookSchema);