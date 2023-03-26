const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
     //_id of the reviewed book
    reviewedBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        require: true
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },

    isRecommended: {
        type: Boolean,
        required: true
    },

    reviewText: {
        type: String
    
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

module.exports = mongoose.model("Review", reviewSchema);