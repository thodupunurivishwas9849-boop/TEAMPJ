const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  healthIssue: {
    type: String,
    required: true,
    trim: true
  },
  recommendedFoods: [{
    type: String,
    required: true
  }],
  exercises: [{
    type: String,
    required: true
  }],
  yogaPoses: [{
    type: String,
    required: true
  }],
  tips: [{
    type: String,
    required: true
  }],
  dailyRoutine: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Suggestion', suggestionSchema);
