const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSkills = new Schema({
  userId: String,
  skillId: String,
  point: Number
}, {timestamps: { createdAt: 'created_at', updateAt: 'update_at' }});

// UserSkills.index({ userId: 1, skillId: 1 }, { unique: true });

module.exports = mongoose.model("UserSkills", UserSkills);