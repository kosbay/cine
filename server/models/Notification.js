const mongoose = require("mongoose");

const { Schema } = mongoose;

const Notification = new Schema({
  recieverType: String,
  notificationMessageId: String,
}, {timestamps: { createdAt: 'created_at', updateAt: 'update_at' }});

module.exports = mongoose.model("Notification", Notification);
