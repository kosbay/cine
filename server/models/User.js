const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profile'
  },
  avatar: {
    type: String,
    default: 'uploads/image/default-avatar.svg'
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken:{
    type: String,
    default: null
  },
  resetPasswordExpires:{
    type: Date,
    default: null
  }
});

module.exports = User = mongoose.model('user', UserSchema);
