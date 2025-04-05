import easyocr
from fuzzywuzzy import process

# Initialize EasyOCR reader for English language
reader = easyocr.Reader(['en'])

# Predefined list of medications (capitalized)
medication_list = ['ASPIRIN', 'IBUPROFEN', 'TYLENOL', 'AMOXICILLIN', 'PREDNISONE', "LEVOTHYROXINE"]

# Function to extract text from the image and match medications
def extract_and_match_medications(image_path):
    # Perform OCR on the image
    ocr_result = reader.readtext(image_path)

    # Extract only the capitalized words
    extracted_text = [result[1].upper() for result in ocr_result]

    # Filter for capitalized words that could be medication names
    capitalized_words = [word for word in extracted_text if word.isupper()]

    print("Capitalized words extracted:", capitalized_words)

    # Use fuzzy matching to find the best possible medication match
    matches = []
    for word in capitalized_words:
        best_match = process.extractOne(word, medication_list)
        if best_match:
            matches.append(best_match)

    # Remove duplicates if any
    matches = list(set(matches))

    print("Matched medications:", matches)

# Test the function with an image
image_path = 'right.jpeg'
extract_and_match_medications(image_path)
