// const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const mongoose = require('mongoose-fill')

const User = mongoose.model("User");

const { Schema } = mongoose;

const School = new Schema({
  name: String,
  wupai: { type: Number, default: 0 }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true 
  }
});

School.fill('studentsCount', function fillStudentCountMiddleware(callback) {
  User.count({
    school: this._id,
    role: { $eq: "user" }
  }).exec(callback);
});

School.plugin(mongoosePaginate);

module.exports = mongoose.model("School", School);
