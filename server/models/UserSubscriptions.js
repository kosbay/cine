const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSubscriptions = new Schema({
  subscriptionId: String,
  type: { 
    type: String,
    enum: ["online", "offline"],
    default: "offline"
  },
  startDate: Date,
  active: Boolean,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  tariffId: { type: Schema.Types.ObjectId, ref: "Tariff" },
  userCardId: { type: Schema.Types.ObjectId, ref: "USerCards" }
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model("UserSubscriptions", UserSubscriptions);
