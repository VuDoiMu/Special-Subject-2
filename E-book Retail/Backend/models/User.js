const { ObjectId } = require("mongodb");
const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        lowercase: true,
        minLength: 3,
        maxLength: 100
    },
    dateOfBirth: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 100,
        lowercase: true
    },
    password: {
        type: String,
        required: true
        //add more password validator
    },
    userPhone: {
        type: Number,
        required: false,
        length: 10
    },
    address: {
        type: String,
        required: false,
        length: 255,
    },
    inventory: {
        type: [ObjectId],
    },
    role: {
        type: Number,
        default: 0 //0 = customer; 1 = admin
    },
    favorbooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book' 
        }],
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