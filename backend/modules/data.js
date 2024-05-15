const mongoose = require("mongoose");

const detaschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    CardNumber: {
        type: String,
        required: true,
    },
    Amount: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now, 
    }
});

module.exports = mongoose.model("data", detaschema);
