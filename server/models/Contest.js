const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const Contest = new Schema({
  name: String,
  description: String,
  imageURL: String,
  contentURL: String,
  date: String,
  active: Boolean
});

Contest.plugin(mongoosePaginate);

module.exports = mongoose.model("Contest", Contest);
