const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApplySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  fathername: {
    type: String
  },
  sex: {
    type: String,
    required: true
  },
  bornDate: {
    type: Date
  },
  school_name: {
    type: String,
    required: true
  },
  num_of_school: {
    type: String,
    required: true
  },
  univer_id: {
    type: Schema.Types.ObjectId,
    ref: 'univer'
  },
  facultet_id: {
    type: Schema.Types.ObjectId,
    ref: 'facultet'
  },
  special_id: {
    type: Schema.Types.ObjectId,
    ref: 'spec'
  },
  docs: {
    type: Array
  },
  approved: {
    type: Boolean,
    default: false
  },
  refuse: {
    type: Boolean,
    default: false
  },
  refuse_reason: {
    type: String
  },
  location: {
    country: {
      type: String,
      default: 'Казахстан'
    },
    region: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    index: {
      type: String,
      required: true
    }
  }
})

module.exports = Apply = mongoose.model('apply', ApplySchema)
