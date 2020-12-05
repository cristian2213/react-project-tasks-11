const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  state: {
    type: Boolean,
    default: false
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },

  project: {
    // to save the project id
    type: mongoose.Schema.Types.ObjectId,
    // referencia to the colletion
    ref: 'Project'
  }
});

module.exports = mongoose.model('Task', TaskSchema);