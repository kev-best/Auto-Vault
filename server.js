const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { setupSocket } = require('./socket');
const jwt = require('jsonwebtoken');

const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');
const alertRoutes = require('./routes/alerts');
const dealerRoutes = require('./routes/dealerships');


const JWT_SECRET = process.env.JWT_SECRET


const app = express();
const server = http.createServer(app);


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/dealerships', dealerRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Socket.io setup
setupSocket(server);

// JWT Middleware
if (!JWT_SECRET) {
  console.error('JWT_SECRET is not defined in .env file');
  process.exit(1);
}

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

