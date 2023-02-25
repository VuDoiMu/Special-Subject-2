const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
    shipmentDate: {
        type: Date,
        required: true,
    },
    shipmentCost: {
        type: Number,
        required: true
    },
    shipmentContent: {
        type: [Object],
        required: true
    }
})