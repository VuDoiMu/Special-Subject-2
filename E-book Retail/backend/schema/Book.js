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
    description: {
        type: String,
        required: true,
        maxLength: 255
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
    physicCopy: {
        type: Number, //0 = no physic copy, 1 = free copy available, 2 = additional payment for physic copy
        min: 0,
        max: 2,
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