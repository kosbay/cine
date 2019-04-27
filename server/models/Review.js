const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  univer: {
    type: Schema.Types.ObjectId,
    ref: 'univer'
  },
  review: {
    type: String,
    requred: true
  },
  rating: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = Review = mongoose.model('review', ReviewSchema)
