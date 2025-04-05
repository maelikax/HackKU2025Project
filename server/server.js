const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { execFile } = require('child_process');
const path = require('path');
const fuzzy = require('fuzzy');
const app = express();
const PORT = 3000;
const levenshtein = require('fast-levenshtein');
app.use(cors());
app.use(express.json());

// Set up Multer for image uploads
const upload = multer({ dest: 'uploads/' });


function extractCapsWords(text) {
    // Matches whole words in all caps and checks if the length is >= 4
    const capsWords = text.match(/\b[A-Z]{4,}\b/g);
    return capsWords || [];
  }

const medicationDatabase = [
    { name: "AMOXICILLIN", id: 1 },
    { name: "IBUPROFEN", id: 2 },
    { name: "PARACETAMOL", id: 3 },
    { name: "LEVOTHYROXINE", id: 4 },
    // Add more medications here...
  ];
  
  // Function to match extracted text with medication database
  function matchMedication(extractedText, database) {
    const capsWords = extractCapsWords(extractedText);  // Extract all-caps words
    let bestMatch = null;
    let lowestDistance = Infinity;  // Start with the highest possible Levenshtein distance
  
    console.log('Extracted Capitalized Words:', capsWords);
  
    // Loop over each capitalized word and check for matches in the medication database
    capsWords.forEach((word) => {
      database.forEach((medication) => {
        const distance = levenshtein.get(word, medication.name.toUpperCase());  // Calculate Levenshtein distance
  
        console.log(`Comparing word: ${word} with ${medication.name} - Distance: ${distance}`);
  
        // Update the best match if the current distance is lower (more similar)
        if (distance < lowestDistance) {
          lowestDistance = distance;
          bestMatch = medication;
        }
      });
    });
  
    console.log('Best Match:', bestMatch);  // Log the best match
    return bestMatch;
  }
  
// POST route to handle image upload and OCR processing
app.post('/process-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  const imagePath = path.join(__dirname, req.file.path);

  // Call the Python script with the image path
  execFile('/Users/andrewvanderwerf/Documents/GitHub/HackKU2025Project/server/venv/bin/python', ['ocr_script.py', imagePath], (error, stdout, stderr) => {
    if (error) {
      console.error('Python Error:', stderr);
      return res.status(500).json({ error: 'Error processing image' });
    }

    try {
      const result = JSON.parse(stdout);
      const data=result.extracted_text;
      console.log(data);
      const finalresult = matchMedication(data, medicationDatabase);
      console.log(finalresult);
      res.json({ finalresult });
    } catch (e) {
      res.status(500).json({ error: 'Invalid JSON from Python script' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
