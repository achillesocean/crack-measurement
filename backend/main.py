# entry point for FastAPI

from fastapi import FastAPI
from routes import image
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
  "http://localhost:5174"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

# mount the static directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# inlcude routes
app.include_router(image.router)

@app.get("/")
def root():
  return {"message": "Welcome to the Image Processing API"}

# run the server with: uvicorn main:app --reload