const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { execFile } = require('child_process');
const path = require('path');
const fuzzy = require('fuzzy');
const app = express();
const PORT = 3000;
const levenshtein = require('fast-levenshtein');
require('dotenv').config();
app.use(cors());
app.use(express.json());
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


// Set up Multer for image uploads
const upload = multer({ dest: 'uploads/' });

// Initialize Supabase (only if not already initialized)

async function getTodaysMedications(patientId) {
  // Get start and end of today in ISO format
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString();

  const { data, error } = await supabase
    .from('medication_task')
    .select(`
      id,
      scheduled_time,
      medication:medication_id (
        id,
        name,
        dosage,
        patient_id,
        instructions
      )
    `)
    .gte('scheduled_time', startOfDay)
    .lt('scheduled_time', endOfDay);

  if (error) {
    console.error('Error fetching today\'s medication tasks:', error.message);
    return [];
  }

  // Filter only medications that belong to this patient
  const filtered = data.filter(task => task.medication?.patient_id === patientId);

  return filtered;
}


async function getMedicationsFromDatabase(patientId) {
    const { data, error } = await supabase
      .from('medications')  // Assuming you have a 'medications' table in Supabase
      .select('*')
      .eq('patient_id', patientId);  // Filtering medications based on patient_id
  
    if (error) {
      console.error('Error fetching medications:', error.message);
      return [];
    }
  
    return data;
  }

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
      database.forEach((task) => {
        const distance = levenshtein.get(word, task.medication.name.toUpperCase());  // Calculate Levenshtein distance
  
        console.log(`Comparing word: ${word} with ${task.medication.name} - Distance: ${distance}`);
  
        // Update the best match if the current distance is lower (more similar)
        if (distance < lowestDistance) {
          lowestDistance = distance;
          bestMatch = task.medication;
        }
      });
    });
  
    console.log('Best Match:', bestMatch);  // Log the best match
    return bestMatch;
  }
async function getPatientInfo(patientId){
    const { data, error } = await supabase
      .from('patients')  // Assuming you have a 'medications' table in Supabase
      .select('*')
      .eq('id', patientId);  // Filtering medications based on patient_id
  
    if (error) {
      console.error('Error fetching patient info:', error.message);
      return [];
    }
  
    return data; 
}
  
app.get('/patient/:patient_id/medications', async (req, res) => {
    const patientId = req.params.patient_id;
    const medications = await getTodaysMedications(patientId);
    const flattenMedication = (medication) => {
        return {
            id: medication.id,
            scheduled_time: medication.scheduled_time,
            medication_id: medication.medication.id,
            medication_name: medication.medication.name,
            medication_dosage: medication.medication.dosage,
            patient_id: medication.medication.patient_id
        };
    };
    const patient_medications = medications.map(flattenMedication);
    res.json({patient_medications});

});

app.get('/patient/:patient_id/info', async (req, res) => {
    const patientId = req.params.patient_id;
    const patientinfo = await getPatientInfo(patientId);
    res.json({ patientinfo });


});

// POST route to handle image upload and OCR processing
app.post('/process-image', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }
  const patientId = req.body.patient_id;
  const target_medication = req.body.target_medication;
  console.log(target_medication);

  const imagePath = path.join(__dirname, req.file.path);

  // Call the Python script with the image path
  execFile('/Users/andrewvanderwerf/Documents/GitHub/HackKU2025Project/server/venv/bin/python', ['ocr_script.py', imagePath], async (error, stdout, stderr) => {
    if (error) {
      console.error('Python Error:', stderr);
      return res.status(500).json({ error: 'Error processing image' });
    }

    try {
      const result = JSON.parse(stdout);
      const data=result.extracted_text;
      console.log(data);
      const patientId = "30470578-572f-48fd-a696-0db0be84e9ec";
      const fetchPatientMedicines = await getTodaysMedications(patientId);
      console.log(fetchPatientMedicines);
      const finalresult = matchMedication(data, fetchPatientMedicines);
      if (finalresult.name == target_medication){
        return res.json({ match: "True" })
      }
      else{
        return res.json({ match: "False"})
      }
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
