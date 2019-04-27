const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const { Schema } = mongoose;

const Course = new Schema({
  name: String,
  shortDescription: String,
  description: String,
  imageURL: String,
  videoURL: String,
  chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
  certificate: { type: Schema.Types.ObjectId, ref: "Certificate" },
  active: Boolean,
  wupai: { type: Number, default: 0 },
  draft: {
    type: Boolean,
    default: false
  },
  isFree: { type: Boolean, default: false }
});

Course.plugin(mongoosePaginate);

module.exports = mongoose.model("Course", Course);
