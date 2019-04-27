const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  lastname: {
    type: String
  },
  firstname: {
    type: String
  },
  fathername: {
    type: String
  },
  bornDate: {
    type: Date
  },
  school_name: {
    type: String
  },
  school_number: {
    type: String
  },
  location: {
    country: {
      type: String,
      default: 'Казахстан'
    },
    region: {
      type: String
    },
    address: {
      type: String
    },
    index: {
      type: String
    }
  }
})

module.exports = Student = mongoose.model('student', StudentSchema)
