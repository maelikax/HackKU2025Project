const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { execFile } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Set up Multer for image uploads
const upload = multer({ dest: 'uploads/' });

// POST route to handle image upload and OCR processing
app.post('/process-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  const imagePath = path.join(__dirname, req.file.path);

  // Call the Python script with the image path
  execFile('python3', ['ocr_script.py', imagePath], (error, stdout, stderr) => {
    if (error) {
      console.error('Python Error:', stderr);
      return res.status(500).json({ error: 'Error processing image' });
    }

    try {
      const result = JSON.parse(stdout);
      res.json({ result });
    } catch (e) {
      res.status(500).json({ error: 'Invalid JSON from Python script' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
