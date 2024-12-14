# summarizer.py
import os
from typing import Dict
from fastapi import FastAPI, HTTPException
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv

load_dotenv()

try:
    # Try to import langchain and the required elements
    summary_template = """Summarize the following text in a concise paragraph h:\n\n{text} :"""
    # Example template for summarization
    prompt = PromptTemplate(template=summary_template, input_variables=["text"])
    api_key = os.getenv("OPENAI_API_KEY")
    # Configure OpenAI (mock configuration if environment doesn't support OpenAI)
    llm = ChatOpenAI(api_key=api_key,temperature=0.7,model="gpt-4o-mini")
    chain = prompt|llm| StrOutputParser() 
    print(chain)
    
    def summarize_text(text: str) -> str:
        print(text)
        return chain.invoke({"text": text})
except ImportError:
    # Mock the summarization if langchain or OpenAI is not available
    def summarize_text(text: str) -> str:
        return text.split('.')[0] + '.'  # Return first sentence as summary for demonstration