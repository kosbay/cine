const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const { Schema } = mongoose;

const Event = new Schema({
  name: String,
  description: String,
  imageURL: String,
  contentURL: String,
  date: String,
  active: Boolean,
  type: {
    type: String,
    enum: ["contest", "webinar"],
    default: "contest"
  }
});

Event.plugin(mongoosePaginate);

module.exports = mongoose.model("Event", Event);
