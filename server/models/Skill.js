const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');   

const { Schema } = mongoose;

const Skill = new Schema({
  name: String,
  type: String,
  skillPoint: { type: Number, default: 0 }
});

Skill.plugin(mongoosePaginate);

module.exports = mongoose.model("Skill", Skill);
