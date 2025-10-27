/**
 * Message Model
 * Defines the schema for messages stored in MongoDB
 */

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: 150,
    trim: true
  },
  recipient: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
  },
  // Random color assigned to each message for visual variety
  cardColor: {
    type: String,
    default: '#FF2E88'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for sorting by creation time (newest first)
messageSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);