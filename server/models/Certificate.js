const mongoose = require("mongoose");

const { Schema } = mongoose;

const Certificate = new Schema({
  title: String,
  description: String,
  imageUrl: String
});

module.exports = mongoose.model("Certificate", Certificate);
