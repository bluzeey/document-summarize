from typing import Dict
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from summarizer import summarize_text


from dotenv import load_dotenv
import os

load_dotenv()  

app = FastAPI()




# Define the request body structure
class TextInput(BaseModel):
    text: str

@app.post("/summarize")
async def summarize(input: TextInput) -> Dict[str, str]:
    if not input.text:
        raise HTTPException(status_code=400, detail="Text is required for summarization")
    print(input.text)
    # Perform summarization
    summary = summarize_text(input.text)
    print(summary)
    return {"summary": summary}