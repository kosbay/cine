const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const Chapter = new Schema({
  name: String,
  description: String,
  imageURL: String,
  modules: [{ type: Schema.Types.ObjectId, ref: "Module" }],
  active: Boolean,
  wupai: { type: Number, default: 0 },
  isFree: { type: Boolean, default: false }
});

Chapter.plugin(mongoosePaginate);

module.exports = mongoose.model("Chapter", Chapter);
