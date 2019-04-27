const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserProgress = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  lessonId: { type: Schema.Types.ObjectId, ref: "Lesson" },
  result: Number,
  status: String, // finished
  fileURL: String,
  fileName: String,
  feedback: String
}, {timestamps: { createdAt: 'created_at', updateAt: 'update_at' }});

UserProgress.index({ userId: 1, lessonId: 1 }, { unique: true });

module.exports = mongoose.model("UserProgress", UserProgress);
