import easyocr
import cv2
import numpy as np
from fuzzywuzzy import fuzz  # For fuzzy matching
import matplotlib.pyplot as plt

# Sample database of medications (replace with actual database query or a larger list)
medication_database = [
    {"name": "AMOXICILLIN", "id": 1},
    {"name": "IBUPROFEN", "id": 2},
    {"name": "PARACETAMOL", "id": 3},
    {"name": "LEVOTHYROXINE", "id": 4},
    # Add more medications here...
]

# Function to match extracted text with medication database
def match_medication(extracted_text, database):
    best_match = None
    highest_score = 0

    # Normalize the extracted text
    extracted_text = extracted_text.strip().upper()

    for medication in database:
        # Compare extracted text with each medication in the database using fuzzy matching
        score = fuzz.partial_ratio(extracted_text, medication["name"])

        if score > highest_score:
            highest_score = score
            best_match = medication

    return best_match, highest_score

# Load the image
image_path = 'shaky.jpeg'
img = cv2.imread(image_path)

# Check if image was loaded successfully
if img is None:
    print("Error: Image could not be loaded.")
else:
    # Convert from BGR (OpenCV default) to RGB (EasyOCR default)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Optionally, resize the image (you can skip this if the image is fine)
    img_rgb_resized = cv2.resize(img_rgb, (img_rgb.shape[1] * 2, img_rgb.shape[0] * 2))

    # Display the image using Matplotlib to visually inspect

    # Initialize the EasyOCR reader
    reader = easyocr.Reader(['en'])

    # Perform OCR on the resized image
    ocr_result = reader.readtext(img_rgb_resized)

    # Extract text from OCR results
    extracted_text = ""
    for detection in ocr_result:
        extracted_text += detection[1] + " "  # detection[1] contains the recognized text

    # Print the extracted text
    print("Extracted Text: ", extracted_text)

    # Match the extracted text with the medication database
    result=match_medication(extracted_text, medication_database)
    print(result)
