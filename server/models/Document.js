const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  documentType: {
    type: String,
    required: true,
  },
  documentUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Document', DocumentSchema);