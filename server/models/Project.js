const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  creator: {
    // to save the user id
    type: mongoose.Schema.Types.ObjectId,
    // referencia to the colletion
    ref: 'User'
  },

  created_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Project', ProjectSchema);