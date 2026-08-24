require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const requestLogger = require('./middleware/requestLogger');
const authGuard = require('./middleware/authGuard');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const leaveTypeRoutes = require('./routes/leaveTypeRoutes');
const leaveRoutes = require('./routes/leaveRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Public Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/leave-types', leaveTypeRoutes);

// Protected Routes
app.use(authGuard);
app.use('/api/v1/leaves', leaveRoutes);

// Global Error Handler
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/leave-management')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
