const Document = require('../models/Document');
const wasabi = require('../config/wasabi');

exports.uploadDocuments = async (req, res) => {
  try {
    const { logo, documents } = req.files;
    const { companyName } = req.body;

    // Upload files to Wasabi
    const logoUrl = await wasabi.uploadFile(logo[0]);
    const documentUrls = await Promise.all(documents.map(doc => wasabi.uploadFile(doc)));

    // Save document info to MongoDB
    const newDocument = new Document({
      companyName,
      logo: logoUrl,
      documents: documentUrls,
    });

    await newDocument.save();

    res.status(201).json({ message: 'Documents uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading documents' });
  }
};