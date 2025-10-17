const express = require('express');
const router = express.Router();
const { authenticateAdmin } = require('../middleware/auth');
const { upload } = require('../utils/upload');
const Yoga = require('../models/yoga.model');

// Get all yoga poses
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

    const yogaPoses = await Yoga.find(query);
    res.json(yogaPoses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single yoga pose
router.get('/:id', async (req, res) => {
  try {
    const yogaPose = await Yoga.findById(req.params.id);
    if (!yogaPose) {
      return res.status(404).json({ message: 'Yoga pose not found' });
    }
    res.json(yogaPose);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add yoga pose (admin only)
router.post('/', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    const {
      poseName,
      category,
      benefits,
      difficulty,
      instructions,
      duration,
      breathingInstructions,
      contraindications,
      videoUrl
    } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const yogaPose = new Yoga({
      poseName,
      category,
      benefits: JSON.parse(benefits),
      imageUrl,
      videoUrl,
      difficulty,
      instructions: instructions ? JSON.parse(instructions) : [],
      duration: parseInt(duration),
      breathingInstructions: breathingInstructions ? JSON.parse(breathingInstructions) : [],
      contraindications: contraindications ? JSON.parse(contraindications) : []
    });

    await yogaPose.save();
    res.status(201).json({
      message: 'Yoga pose added successfully',
      yogaPose
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update yoga pose (admin only)
router.put('/:id', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    const {
      poseName,
      category,
      benefits,
      difficulty,
      instructions,
      duration,
      breathingInstructions,
      contraindications,
      videoUrl
    } = req.body;
    const imageUrl = req.file ? req.file.path : undefined;

    const updateData = {
      poseName,
      category,
      benefits: JSON.parse(benefits),
      videoUrl,
      difficulty,
      instructions: instructions ? JSON.parse(instructions) : [],
      duration: parseInt(duration),
      breathingInstructions: breathingInstructions ? JSON.parse(breathingInstructions) : [],
      contraindications: contraindications ? JSON.parse(contraindications) : []
    };

    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    const yogaPose = await Yoga.findByIdAndUpdate(req.params.id, updateData, {
      new: true
    });
    if (!yogaPose) {
      return res.status(404).json({ message: 'Yoga pose not found' });
    }

    res.json({
      message: 'Yoga pose updated successfully',
      yogaPose
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete yoga pose (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const yogaPose = await Yoga.findByIdAndDelete(req.params.id);
    if (!yogaPose) {
      return res.status(404).json({ message: 'Yoga pose not found' });
    }
    res.json({ message: 'Yoga pose deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
