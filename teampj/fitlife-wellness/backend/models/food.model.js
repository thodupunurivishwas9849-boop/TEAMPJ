const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['healthy', 'junk']
  },
  description: {
    type: String,
    required: true
  },
  nutrients: [{
    type: String,
    required: true
  }],
  benefits: [{
    type: String,
    required: true
  }],
  imageUrl: {
    type: String
  },
  category: {
    type: String // e.g., 'immunity', 'weight-loss', 'energy'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Food', foodSchema);
