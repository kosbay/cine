const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserCertificate = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  certificate: { type: Schema.Types.ObjectId, ref: "Certificate" },
});

module.exports = mongoose.model("UserCertificate", UserCertificate);
