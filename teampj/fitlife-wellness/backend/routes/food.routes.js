const express = require('express');
const router = express.Router();
const { authenticateAdmin } = require('../middleware/auth');
const { upload } = require('../utils/upload');
const Food = require('../models/food.model');

// Get all foods
router.get('/', async (req, res) => {
  try {
    const { type, category } = req.query;
    let query = {};

    if (type) {
      query.type = type;
    }
    if (category) {
      query.category = category;
    }

    const foods = await Food.find(query);
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single food
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get foods by type
router.get('/type/:type', async (req, res) => {
  try {
    const foods = await Food.find({ type: req.params.type });
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add food (admin only)
router.post('/', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, type, description, nutrients, benefits, category } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const food = new Food({
      name,
      type,
      description,
      nutrients: JSON.parse(nutrients),
      benefits: JSON.parse(benefits),
      category,
      imageUrl
    });

    await food.save();
    res.status(201).json({
      message: 'Food added successfully',
      food
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update food (admin only)
router.put('/:id', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, type, description, nutrients, benefits, category } = req.body;
    const imageUrl = req.file ? req.file.path : undefined;

    const updateData = {
      name,
      type,
      description,
      nutrients: JSON.parse(nutrients),
      benefits: JSON.parse(benefits),
      category
    };

    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    const food = await Food.findByIdAndUpdate(req.params.id, updateData, {
      new: true
    });
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.json({
      message: 'Food updated successfully',
      food
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete food (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
