const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  quest: {
    type: String,
    requred: true
  },
  ans: {
    type: String
  }
})

module.exports = Quest = mongoose.model('quest', QuesSchema)
