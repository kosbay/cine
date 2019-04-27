const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const { Schema } = mongoose;

const FacultyLessons = new Schema({
  facultyId: String,
  lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }]
});

FacultyLessons.plugin(mongoosePaginate);

module.exports = mongoose.model("FacultyLessons", FacultyLessons);
