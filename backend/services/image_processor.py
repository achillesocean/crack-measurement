import cv2
import numpy as np
from pathlib import Path

PROCESSED_DIR = Path("static/processed_images")
PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

def process_image(image_path: Path): # are we ensuring the type of image_path?
  img = cv2.imread(str(image_path))

  img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

  _, segmented = cv2.threshold(img_gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_TRIANGLE)

  processed_path = PROCESSED_DIR / (f"processed_{image_path.name}")
  cv2.imwrite(str(processed_path), segmented) # what does this do?

  return processed_path