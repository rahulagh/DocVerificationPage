// server/routes/api/documents.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadToWasabi } = require('../../services/wasabi');
const Document = require('../../models/Document');

// Configure multer for file uploads
const upload = multer({
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB
  },
});

router.post('/', upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'document', maxCount: 1 },
  ]), async (req, res) => {
    try {
      console.log('Received request body:', req.body);
      console.log('Received files:', req.files);
  
      const { companyName, documentType } = req.body;
      const logo = req.files['logo'][0];
      const document = req.files['document'][0];
  
      // Validate input
      if (!companyName || !documentType || !logo || !document) {
        return res.status(400).json({ msg: 'Missing required fields' });
      }
  
      // Validate file types and sizes
      if (!validateFile(logo, ['image/jpeg', 'image/png'], 500 * 1024)) {
        return res.status(400).json({ msg: 'Invalid logo file' });
      }
  
      if (!validateFile(document, ['application/pdf'], 1 * 1024 * 1024)) {
        return res.status(400).json({ msg: 'Invalid document file' });
      }
  
      // Upload files to Wasabi
      const logoUrl = await uploadToWasabi(logo.buffer, `logos/${companyName}-logo.${getFileExtension(logo.originalname)}`, logo.mimetype);
      const documentUrl = await uploadToWasabi(document.buffer, `documents/${companyName}-${documentType}.${getFileExtension(document.originalname)}`, document.mimetype);

  
      // Save document info to MongoDB
      const newDocument = new Document({
        companyName,
        logo: logoUrl,
        documentType,
        documentUrl,
      });
  
      await newDocument.save();
  
      res.json({ msg: 'Document uploaded successfully' });
    } catch (err) {
      console.error('Error in document upload:', err);
      res.status(500).json({ msg: 'Server Error', error: err.message });
    }
  });
  

function validateFile(file, allowedTypes, maxSize) {
  return file && allowedTypes.includes(file.mimetype) && file.size <= maxSize;
}

function getFileExtension(filename) {
  return filename.split('.').pop();
}

module.exports = router;