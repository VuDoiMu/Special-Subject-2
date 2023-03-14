const mongoose  = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 255,
        required: true,
        lowercase: true,
        minLength: 1
    },
    category: {
        type: String,
        maxLength: 60,
        required: true,
        lowercase: true,
        minLength: 1
    },
    price: {
        type: Number,
        required: true
    },
    discountedPrice: {
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
    isComic: {
        type: Boolean,
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