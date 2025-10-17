const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/foods', require('./routes/food.routes'));
app.use('/api/exercises', require('./routes/exercise.routes'));
app.use('/api/yoga', require('./routes/yoga.routes'));
app.use('/api/suggestions', require('./routes/suggestion.routes'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'FitLife Wellness API is running! 🎉',
    status: 'OK',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      user: '/api/user',
      admin: '/api/admin',
      foods: '/api/foods',
      exercises: '/api/exercises',
      yoga: '/api/yoga',
      suggestions: '/api/suggestions'
    },
    frontend: 'http://localhost:4200'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FitLife Wellness API is running' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`FitLife Wellness API running on port ${PORT}`);
});

module.exports = app;
