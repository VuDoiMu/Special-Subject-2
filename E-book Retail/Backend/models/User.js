const { ObjectId } = require("mongodb");
const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 3,
        maxLength: 100
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 100,
        lowercase: true
    },
    userName: {
        type: String,
        immutable: true,
        required: true,
        lowercase: true,
        minLength: 3,
        maxLength: 25
    },
    userPassword: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 25
        //add more password validator
    },
    userPhone: {
        type: Number,
        required: true,
        length: 10
    },
    address: {
        type: String,
        required: true,
        length: 255,
    },
    inventory: {
        type: [ObjectId],
    },
    role: {
        type: Number,
        default: 0 //0 = customer; 1 = admin
    },
    cart: {
        type: [ObjectId],
    },
    purchaseHistory: {
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
    },
    refreshToken: {
        type: String
    }
});
module.exports = mongoose.model("User", userSchema);