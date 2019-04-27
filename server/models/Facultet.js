const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FacultetSchema = new Schema({
  fac_name: {
    type: String
  },
  univer: {
    type: Schema.Types.ObjectId,
    ref: 'univer'
  },
  specs: [{
    type: Schema.Types.ObjectId,
    ref: 'spec'
  }],
})

module.exports = Profile = mongoose.model('facultet', FacultetSchema)
