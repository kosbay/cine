const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const Project = new Schema({
  name: String,
  imageURL: String
});

const Faculty = new Schema({
  name: String,
  shortDescription: String,
  description: String,
  imageURL: String,
  videoURL: String,
  projects: [Project],
  projectsAmount: String,
  tasksAmount: String,
  active: Boolean,
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  color: String,
  wupai: { type: Number, default: 0 },
  isFree: { type: Boolean, default: false }
});

Faculty.plugin(mongoosePaginate);

module.exports = mongoose.model("Faculty", Faculty);
