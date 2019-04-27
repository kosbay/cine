const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const NotificationMessage = new Schema({
  title: String,
  description: String,
  imageURL: String,
  date: String,
  type: {
    type: String,
    default: "news"
  }
});


NotificationMessage.plugin(mongoosePaginate);

module.exports = mongoose.model("NotificationMessage", NotificationMessage);
