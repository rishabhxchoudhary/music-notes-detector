from fastapi import FastAPI, File, UploadFile
from function import get_music_notes
import json
from fastapi.middleware.cors import CORSMiddleware

origins = [
    'http://localhost:3000'
]

app = FastAPI()

app.add_middleware(CORSMiddleware,allow_origins =origins , allow_credentials = True, allow_methods = ["*"], allow_headers = ["*"])

@app.post("/")
async def create_upload_file(file: UploadFile = File(...)):
    bytes = await file.read()
    notes = get_music_notes(bytes)
    return notes