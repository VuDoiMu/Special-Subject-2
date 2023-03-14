const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
     //_id of the reviewed book
    reviewedBook: {
        type: String,
        required: true
    },

    //_id of the reviewer
    reviewer: {
        type: String,
        required: true
    },

    isRecommneded: {
        type: Boolean,
        required: true
    },

    reviewText: {
        type: String
    }
})

module.exports = mongoose.model("Review", reviewSchema);