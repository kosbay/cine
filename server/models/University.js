const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UniverSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  logo: {
    type: String,
    default: 'uploads/image/default-logo.png'
  },
  wallpapper: {
    type: String,
    default: 'uploads/image/default-wallpapper.jpg'
  },
  univer_name: {
    type: String,
    requred: true
  },
  addreviation: {
    type: String,
    requred: true
  },
  category: {
    type: String,
    requred: true
  },
  code: {
    type: String,
    requred: true
  },
  type: {
    type: String,
    requred: true
  },
  license: {
    type: String,
    requred: true
  },
  expire: {
    type: Date,
    requred: true,
    default: Date.now
  },
  o_email: {
    type: String,
    requred: true
  },
  phone: {
    type: String
  },
  website: {
    type: String
  },
  description: {
    type: String
  },
  grants: {
    type: Number
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'student'
  }],
  faculties: [{
    type: Schema.Types.ObjectId,
    ref: 'facultet'
  }],
  location: {
    country: {
      type: String,
      default: 'Казахстан'
    },
    region: {
      type: String
    },
    city: {
      type: String
    },
    address: {
      type: String
    },
    lat: {
      type: Number,
      default: 43.238949
    },
    lng: {
      type: Number,
      default: 76.889709
    }
  },
  social: {
    fb: {
      type: String
    },
    insta: {
      type: String
    },
    twitter: {
      type: String
    },
    vk: {
      type: String
    },
    youtube: {
      type: String
    },
    other: {
      type: String
    }
  },
  apps: {
    type: Number,
    default: 0
  },
  revs: [{
    type: Array
  }]
})

module.exports = Univer = mongoose.model('univer', UniverSchema)
