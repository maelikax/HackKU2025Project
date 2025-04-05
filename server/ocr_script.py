import sys
import json
import easyocr

def main(image_path):
    reader = easyocr.Reader(['en'], gpu=False)
    results = reader.readtext(image_path)
    
    words = [text[1] for text in results]
    print(json.dumps(words))  # stdout back to Node.js

if __name__ == '__main__':
    image_path = sys.argv[1]
    main(image_path)
