const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserModulePoints = new Schema({
  moduleId: { type: Schema.Types.ObjectId, ref: "Module" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  wupai: Number
});

UserModulePoints.index({ userId: 1, moduleId: 1 }, { unique: true });

module.exports = mongoose.model("UserModulePoints", UserModulePoints);
