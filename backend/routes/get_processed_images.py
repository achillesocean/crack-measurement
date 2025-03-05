from fastapi import Request, Response, APIRouter
from pathlib import Path

router = APIRouter()

# Serve processed images with CORS headers
@router.get("/processed_images/{image_name}")
async def get_processed_image(image_name: str, request: Request): # does this syntax actually typecase? for example, image_name should be a string or does it typecast? 
    image_path = Path(f"static/processed_images/{image_name}")

    if not image_path.exists():
        return Response(content="Image not found", status_code=404)

    # Open and read the image file
    with image_path.open("rb") as img_file:
        image_data = img_file.read()

    # Set the correct headers for cross-origin usage
    headers = {
        "Access-Control-Allow-Origin": "*",  # Allow all origins (adjust if needed)
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "image/png"  # Change based on the actual image type
    }

    return Response(content=image_data, media_type="image/png", headers=headers)
