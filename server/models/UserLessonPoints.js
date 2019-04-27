const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserLessonPoints = new Schema({
  lessonId: { type: Schema.Types.ObjectId, ref: "Lesson" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  wupai: Number
});

UserLessonPoints.index({ userId: 1, lessonId: 1 }, { unique: true });

module.exports = mongoose.model("UserLessonPoints", UserLessonPoints);
