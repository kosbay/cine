const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserFacultyPoints = new Schema({
  facultyId: { type: Schema.Types.ObjectId, ref: "Faculty" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  wupai: Number
});

UserFacultyPoints.index({ userId: 1, facultyId: 1 }, { unique: true });

module.exports = mongoose.model("UserFacultyPoints", UserFacultyPoints);
