const mongoose  = require("mongoose");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 255,
        required: true,
        minLength: 1
    },
    image: {
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
    countLike: {
        type: Number,
        default : 0
    },
    countSale : {
        type : Number,
        default: 0
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

bookSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("Book", bookSchema);