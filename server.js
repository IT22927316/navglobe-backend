const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// App initialization
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Base route for health check
app.get('/', (req, res) => {
  res.send('✅ API is running');
});

// MongoDB + Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    // ✅ Use Render-required port binding
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
