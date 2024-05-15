const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BloggerSchema = new Schema({
  imgurl:{
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Blogger", BloggerSchema);
