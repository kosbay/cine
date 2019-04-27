const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserCards = new Schema({
  token: String,
  name: String,
  userEmail: String,
  cardFirstSix: "String",
  cardLastFour: "String",
  cardType: "String",
  issuer: "String",
  userId: { type: Schema.Types.ObjectId, ref: "User" }
}, {timestamps: { createdAt: 'created_at', updateAt: 'update_at' }});

module.exports = mongoose.model("UserCards", UserCards);
