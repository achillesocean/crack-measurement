from fastapi import APIRouter, File, UploadFile
import shutil
import uuid
from pathlib import Path
from services.image_processor import process_image

router = APIRouter()

UPLOAD_DIR = Path("static/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@router.post("/process-image")
async def upload_image(file: UploadFile = File(...)):
  # Get file extension safely
  file_ext = Path(file.filename).suffix
  file_ext = file_ext if file_ext else ".png"  # Default to PNG if missing
  
  file_name = f"{uuid.uuid4()}.{file_ext}"
  file_path = UPLOAD_DIR / file_name

  with file_path.open("wb") as buffer:
    shutil.copyfileobj(file.file, buffer)

  # process image
  processed_img_path = process_image(file_path) # filepath looks like static/uploads/uuid.png

  return {"processed_image_url": f"http://127.0.0.1:8000/processed_images/{processed_img_path.name}"}
