const mongoose = require("mongoose")

const voucherSchema = new mongoose.Schema({
    voucherValue: {
        type: Number, 
        required: true,
        min: 1,
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
    expiringDate: {
        type: Date,
        required: true
    }
})
module.exports = mongoose.model("Voucher", voucherSchema);