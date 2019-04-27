const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema({
  name: String,
  username: String,
  password: String,
  role: { 
    type: String,
    enum: ["user", "admin", "reviewer", "teacher", "demo", "individual", "group", "digital"],
    default: "user"
  },
  additional: { 
    type: String,
    enum: ["unpayed", "payed"],
    default: "unpayed"
  },
  isVerified: Boolean,
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  faculties: [{ type: Schema.Types.ObjectId, ref: "Faculty" }],
  school: { type: Schema.Types.ObjectId, ref: "School" },
  skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  wupai: { type: Number, default: 0 },
  avatar: { body: Number, eyes: Number, mouth: Number },
  grade: String,
  phoneNumber: String,
  parentPhoneNumber: String,
  tariff: { type: Schema.Types.ObjectId, ref: "Tariff" }
});

User.plugin(passportLocalMongoose, { populateFields: ["skills", "school"] });
User.plugin(mongoosePaginate);

module.exports = mongoose.model("User", User);
