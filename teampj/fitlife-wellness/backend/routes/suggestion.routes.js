const express = require('express');
const router = express.Router();
const { authenticateAdmin, authenticateUser } = require('../middleware/auth');
const { upload } = require('../utils/upload');
const Suggestion = require('../models/suggestion.model');
const Food = require('../models/food.model');
const Exercise = require('../models/exercise.model');
const Yoga = require('../models/yoga.model');

// Get personalized suggestions based on health issues
router.post('/get', authenticateUser, async (req, res) => {
  try {
    const { healthIssues } = req.user;
    let matchedSuggestion = null;

    // Find closest matching suggestion based on health issues
    for (const issue of healthIssues) {
      matchedSuggestion = await Suggestion.findOne({
        healthIssue: { $regex: new RegExp(issue, 'i') }
      });
      if (matchedSuggestion) break;
    }

    if (!matchedSuggestion) {
      return res.status(404).json({ message: 'No suggestions found for your health issues' });
    }

    // Get detailed data for recommended foods, exercises, and yoga
    const [foods, exercises, yogaPoses] = await Promise.all([
      Food.find({ name: { $in: matchedSuggestion.recommendedFoods } }),
      Exercise.find({ name: { $in: matchedSuggestion.exercises } }),
      Yoga.find({ poseName: { $in: matchedSuggestion.yogaPoses } })
    ]);

    const suggestion = {
      healthIssue: matchedSuggestion.healthIssue,
      recommendedFoods: foods,
      exercises: exercises,
      yogaPoses: yogaPoses,
      tips: matchedSuggestion.tips,
      dailyRoutine: matchedSuggestion.dailyRoutine
    };

    res.json(suggestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all suggestions (admin only)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const suggestions = await Suggestion.find();
    res.json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single suggestion
router.get('/:id', async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id);
    if (!suggestion) {
      return res.status(404).json({ message: 'Suggestion not found' });
    }
    res.json(suggestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add suggestion (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const {
      healthIssue,
      recommendedFoods,
      exercises,
      yogaPoses,
      tips,
      dailyRoutine
    } = req.body;

    const suggestion = new Suggestion({
      healthIssue,
      recommendedFoods: JSON.parse(recommendedFoods),
      exercises: JSON.parse(exercises),
      yogaPoses: JSON.parse(yogaPoses),
      tips: JSON.parse(tips),
      dailyRoutine
    });

    await suggestion.save();
    res.status(201).json({
      message: 'Suggestion added successfully',
      suggestion
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update suggestion (admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const {
      healthIssue,
      recommendedFoods,
      exercises,
      yogaPoses,
      tips,
      dailyRoutine
    } = req.body;

    const updateData = {
      healthIssue,
      recommendedFoods: JSON.parse(recommendedFoods),
      exercises: JSON.parse(exercises),
      yogaPoses: JSON.parse(yogaPoses),
      tips: JSON.parse(tips),
      dailyRoutine
    };

    const suggestion = await Suggestion.findByIdAndUpdate(req.params.id, updateData, {
      new: true
    });
    if (!suggestion) {
      return res.status(404).json({ message: 'Suggestion not found' });
    }

    res.json({
      message: 'Suggestion updated successfully',
      suggestion
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete suggestion (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const suggestion = await Suggestion.findByIdAndDelete(req.params.id);
    if (!suggestion) {
      return res.status(404).json({ message: 'Suggestion not found' });
    }
    res.json({ message: 'Suggestion deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
