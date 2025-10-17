const express = require('express');
const router = express.Router();
const { authenticateAdmin } = require('../middleware/auth');
const { upload } = require('../utils/upload');
const Exercise = require('../models/exercise.model');

// Get all exercises
router.get('/', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }
    if (difficulty) {
      query.difficulty = difficulty;
    }

    const exercises = await Exercise.find(query);
    res.json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single exercise
router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.json(exercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add exercise (admin only)
router.post('/', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      category,
      difficulty,
      benefits,
      instructions,
      duration,
      caloriesBurned,
      videoUrl
    } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const exercise = new Exercise({
      name,
      category,
      difficulty,
      imageUrl,
      videoUrl,
      benefits: JSON.parse(benefits),
      instructions: instructions ? JSON.parse(instructions) : [],
      duration: parseInt(duration),
      caloriesBurned: parseInt(caloriesBurned)
    });

    await exercise.save();
    res.status(201).json({
      message: 'Exercise added successfully',
      exercise
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update exercise (admin only)
router.put('/:id', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      category,
      difficulty,
      benefits,
      instructions,
      duration,
      caloriesBurned,
      videoUrl
    } = req.body;
    const imageUrl = req.file ? req.file.path : undefined;

    const updateData = {
      name,
      category,
      difficulty,
      videoUrl,
      benefits: JSON.parse(benefits),
      instructions: instructions ? JSON.parse(instructions) : [],
      duration: parseInt(duration),
      caloriesBurned: parseInt(caloriesBurned)
    };

    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    const exercise = await Exercise.findByIdAndUpdate(req.params.id, updateData, {
      new: true
    });
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    res.json({
      message: 'Exercise updated successfully',
      exercise
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete exercise (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
