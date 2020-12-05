const mongoose = require('mongoose');
const { Schema } = mongoose;

/* each property of the fields are called  schematypes */
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  }

});

module.exports = mongoose.model('User', UserSchema);