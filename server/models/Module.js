const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const Module = new Schema({
  name: String,
  identifier: String,
  imageURL: String,
  lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
  skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  wupai: { type: Number, default: 0 },
  isFree: { type: Boolean, default: false }
});

Module.plugin(mongoosePaginate);

module.exports = mongoose.model("Module", Module);
