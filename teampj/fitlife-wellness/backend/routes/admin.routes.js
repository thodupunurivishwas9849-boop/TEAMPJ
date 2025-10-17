const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const User = require('../models/user.model');
const Food = require('../models/food.model');
const Exercise = require('../models/exercise.model');
const Yoga = require('../models/yoga.model');
const Suggestion = require('../models/suggestion.model');



// Dashboard Preview (Public - no auth required)
router.get('/dashboard-preview', async (req, res) => {
  try {
    const [userCount, foodCount, exerciseCount, yogaCount, suggestionCount] = await Promise.all([
      User.countDocuments(),
      Food.countDocuments(),
      Exercise.countDocuments(),
      Yoga.countDocuments(),
      Suggestion.countDocuments()
    ]);

    res.json({
      stats: {
        users: userCount,
        foods: foodCount,
        exercises: exerciseCount,
        yoga: yogaCount,
        suggestions: suggestionCount
      }
    });
  } catch (error) {
    console.error('Dashboard preview error:', error);
    res.status(500).json({ message: 'Error fetching preview stats' });
  }
});

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, hasPassword: !!password });

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }


    const admin = await Admin.findOne({ username });
    console.log('Admin found:', !!admin);

    if (!admin) {
      console.log('❌ No admin found in database! Creating one...');

      // Create a temporary admin for testing
      const tempAdmin = new Admin({
        username: 'testadmin',
        password: 'test123'
      });
      await tempAdmin.save();
      console.log('✅ Created test admin: testadmin / test123');

      return res.json({
        message: 'Test admin created! Use testadmin/test123',
        testCredentials: { username: 'testadmin', password: 'test123' }
      });
    }

    console.log('Testing password for admin:', admin.username);
    const isMatch = await admin.comparePassword(password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.log('❌ Password verification failed');
      return res.status(401).json({
        message: 'Invalid credentials',
        success: false
      });
    }

    console.log('✅ Password verified successfully');
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'fitlife-secret-key', {
      expiresIn: '7d'
    });
    console.log('✅ Generated JWT token');

    res.json({
      message: 'Admin login successful',
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Middleware to authenticate admin
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fitlife-secret-key');
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ message: 'Token is not valid. Admin not found.' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid.' });
  }
};

// Get dashboard stats
router.get('/dashboard', authenticateAdmin, async (req, res) => {
  try {
    const [userCount, foodCount, exerciseCount, yogaCount, suggestionCount] = await Promise.all([
      User.countDocuments(),
      Food.countDocuments(),
      Exercise.countDocuments(),
      Yoga.countDocuments(),
      Suggestion.countDocuments()
    ]);

    res.json({
      stats: {
        users: userCount,
        foods: foodCount,
        exercises: exerciseCount,
        yoga: yogaCount,
        suggestions: suggestionCount
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (admin only)
router.get('/users', authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all foods (admin only)
router.get('/foods', authenticateAdmin, async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all exercises (admin only)
router.get('/exercises', authenticateAdmin, async (req, res) => {
  try {
    const exercises = await Exercise.countDocuments();
    const exercisesList = await Exercise.find();
    res.json({
      count: exercises,
      exercises: exercisesList
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all yoga sessions (admin only)
router.get('/yoga', authenticateAdmin, async (req, res) => {
  try {
    const yoga = await Yoga.find();
    res.json(yoga);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all suggestions (admin only)
router.get('/suggestions', authenticateAdmin, async (req, res) => {
  try {
    const suggestions = await Suggestion.find().populate('userId', 'username email');
    res.json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user (admin only)
router.delete('/users/:id', authenticateAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete suggestion (admin only)
router.delete('/suggestions/:id', authenticateAdmin, async (req, res) => {
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

// Delete exercise (admin only)
router.delete('/exercises/:id', authenticateAdmin, async (req, res) => {
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

// Delete yoga pose (admin only)
router.delete('/yoga/:id', authenticateAdmin, async (req, res) => {
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

// Create sample data for demonstration
router.post('/seed-data', authenticateAdmin, async (req, res) => {
  try {
    // Sample foods
    const sampleFoods = [
      {
        name: 'Banana',
        type: 'Fruit',
        description: 'A popular tropical fruit rich in potassium and natural sugars.',
        nutrients: { calories: '105 kcal', protein: '1.3g', carbs: '27g', fiber: '3.1g', potassium: '422mg' },
        benefits: ['Good source of potassium', 'Natural energy boost', 'Aids digestion'],
        category: 'Snack'
      },
      {
        name: 'Spinach',
        type: 'Vegetable',
        description: 'Leafy green vegetable packed with vitamins and minerals.',
        nutrients: { calories: '23 kcal', protein: '2.9g', carbs: '3.6g', fiber: '2.2g', iron: '2.7mg' },
        benefits: ['Rich in iron', 'High in vitamins', 'Supports bone health'],
        category: 'Dinner'
      }
    ];

    // Sample exercises
    const sampleExercises = [
      {
        name: 'Push-ups',
        type: 'Strength',
        description: 'Classic upper body exercise that builds chest, shoulders, and tricep strength.',
        instructions: ['1. Start in plank position', '2. Lower chest to ground', '3. Push back up', '4. Repeat'],
        duration: 10,
        difficulty: 'Intermediate',
        muscles: ['Chest', 'Shoulders', 'Arms'],
        benefits: ['Builds upper body strength', 'Improves core stability', 'Boosts metabolism'],
        category: 'Upper Body'
      },
      {
        name: 'Mountain Climbers',
        type: 'HIIT',
        description: 'Dynamic cardio exercise that combines cardiovascular work with core strengthening.',
        instructions: ['1. Start in plank position', '2. Bring right knee to chest', '3. Quickly switch legs', '4. Continue alternating'],
        duration: 30,
        difficulty: 'Intermediate',
        muscles: ['Core', 'Shoulders', 'Legs'],
        benefits: ['Cardiovascular workout', 'Core strengthening', 'Improves coordination'],
        category: 'Full Body'
      }
    ];

    // Sample yoga poses
    const sampleYoga = [
      {
        name: 'Mountain Pose',
        sanskritName: 'Tadasana',
        description: 'Fundamental standing pose that improves posture and balance.',
        instructions: ['1. Stand with feet together', '2. Ground through all four corners of feet', '3. Lengthen spine and reach crown up', '4. Relax shoulders down'],
        duration: 30,
        difficulty: 'Beginner',
        benefits: ['Improves posture', 'Strengthens legs', 'Enhances balance'],
        poseType: 'Standing'
      },
      {
        name: 'Tree Pose',
        sanskritName: 'Vrksasana',
        description: 'Balance pose that improves concentration and strengthens legs.',
        instructions: ['1. Start in Mountain Pose', '2. Shift weight to left foot', '3. Place right foot on inner left thigh', '4. Bring hands to heart center', '5. Hold and breathe'],
        duration: 45,
        difficulty: 'Beginner',
        benefits: ['Improves balance', 'Strengthens legs', 'Enhances focus'],
        poseType: 'Balance'
      }
    ];

    await Food.insertMany(sampleFoods, { ordered: false }).catch(err => {});
    await Exercise.insertMany(sampleExercises, { ordered: false }).catch(err => {});
    await Yoga.insertMany(sampleYoga, { ordered: false }).catch(err => {});

    res.json({ message: 'Sample data added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
