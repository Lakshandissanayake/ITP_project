const mongoose = require("mongoose");

const cardschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    CardNumber: {
        type: String,
        required: true,
        unique: true,
    },
    ExpDate: {
        type: Date,
       
    },
    CCV: {
        type: String,
        required: true,
        maxlength: 3,
       
    },
    created: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Card", cardschema);
