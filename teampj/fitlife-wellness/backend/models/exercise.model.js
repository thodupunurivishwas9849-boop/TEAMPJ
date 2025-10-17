const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true, // e.g., 'cardio', 'strength', 'flexibility'
    trim: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  imageUrl: {
    type: String
  },
  videoUrl: {
    type: String
  },
  benefits: [{
    type: String,
    required: true
  }],
  instructions: [{
    type: String
  }],
  duration: {
    type: Number, // in minutes
    min: 1
  },
  caloriesBurned: {
    type: Number // approximate calories burned per session
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Exercise', exerciseSchema);
