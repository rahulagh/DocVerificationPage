// server/app.js
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const app = express();
require('dotenv').config();


// Middleware
app.use(express.json());
app.use(cors());


// Connect to MongoDB
mongoose.connect('mongodb+srv://rahulkrgupta18032003:Rahul%402003@cluster0.ns3awbj.mongodb.net/docVerificationPage', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/documents', require('./routes/api/document'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment variables loaded:', {
    WASABI_ACCESS_KEY: process.env.WASABI_ACCESS_KEY ? '****' : 'undefined',
    WASABI_SECRET_KEY: process.env.WASABI_SECRET_KEY ? '****' : 'undefined',
    WASABI_REGION: process.env.WASABI_REGION || 'undefined',
    WASABI_ENDPOINT: process.env.WASABI_ENDPOINT || 'undefined',
    WASABI_BUCKET: process.env.WASABI_BUCKET || 'undefined',
  });
});


