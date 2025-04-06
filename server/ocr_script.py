import easyocr
import cv2
import json
import sys

# Function to process the image
def process_image(image_path):
    # Load the image
    img = cv2.imread(image_path)
    # Resize image (adjust size as needed)
    img_resized = cv2.resize(img, (1200, 800))  # Resize image to a smaller size (adjust dimensions)
    # Check if image was loaded successfully
    if img is None:
        return {"error": "Image could not be loaded."}
    
    # Convert from BGR (OpenCV default) to RGB (EasyOCR default)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Initialize the EasyOCR reader
    reader = easyocr.Reader(['en'])

    # Perform OCR on the image
    ocr_result = reader.readtext(img_rgb)

    # Extract text from OCR results
    extracted_text = ""
    for detection in ocr_result:
        extracted_text += detection[1] + " "  # detection[1] contains the recognized text

    # Return the extracted text
    return {"extracted_text": extracted_text.strip()}

if __name__ == "__main__":
    # Image path passed from Node.js
    image_path = sys.argv[1]

    # Process the image
    result = process_image(image_path)

    # Output result as JSON
    print(json.dumps(result))
