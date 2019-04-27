const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserChapterPoints = new Schema({
  chapterId: { type: Schema.Types.ObjectId, ref: "Chapter" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  wupai: Number
});

UserChapterPoints.index({ userId: 1, chapterId: 1 }, { unique: true });

module.exports = mongoose.model("UserChapterPoints", UserChapterPoints);
