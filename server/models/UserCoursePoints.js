const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserCoursePoints = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  wupai: Number
});

UserCoursePoints.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model("UserCoursePoints", UserCoursePoints);
