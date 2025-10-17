const mongoose = require('mongoose');

const yogaSchema = new mongoose.Schema({
  poseName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true, // e.g., 'stress-relief', 'back-pain', 'weight-loss', 'flexibility'
    trim: true
  },
  benefits: [{
    type: String,
    required: true
  }],
  imageUrl: {
    type: String
  },
  videoUrl: {
    type: String
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  instructions: [{
    type: String
  }],
  duration: {
    type: Number, // in minutes
    min: 1
  },
  breathingInstructions: [{
    type: String
  }],
  contraindications: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Yoga', yogaSchema);
