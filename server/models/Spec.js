const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SpecSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  staff_1: {
    type: String
  },
  staff_2: {
    type: String
  },
  univer: {
    type: Schema.Types.ObjectId,
    ref: 'univer'
  },
  facultet: {
    type: Schema.Types.ObjectId,
    ref: 'facultet'
  },
  apps: {
    type: Number,
    default: 0
  }
})

module.exports = Profile = mongoose.model('spec', SpecSchema)
