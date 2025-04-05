import cv2
import easyocr
import matplotlib.pyplot as plt

# Load the image
image_path = 'path_to_your_pill_bottle_image.jpeg'
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
    plt.imshow(img_rgb_resized)
    plt.axis('off')  # Hide axes
    plt.show()

    # Initialize the EasyOCR reader
    reader = easyocr.Reader(['en'])

    # Perform OCR on the resized image
    ocr_result = reader.readtext(img_rgb_resized)

    # Print the OCR results
    if ocr_result:
        print("OCR detected text:")
        for detection in ocr_result:
            print(detection)
    else:
        print("No text detected.")
