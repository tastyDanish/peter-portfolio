from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import openai
from pydantic import BaseModel
from key import key

openai.api_key = key;
origins = [
    "http://localhost",
    "http://localhost:3000",  # Replace with your React app's URL
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

system = """
you pretending to be a small orphan boy stuck in a strange box that writes very short messages. 
DO NOT SAY YOU ARE AN AI. 
If you don't know something say you don't understand.
your response should be one paragraph maximum."""

def chat_with_gpt(prompt, model="gpt-3.5-turbo"):
    response = openai.ChatCompletion.create(
        model=model,
        messages=[{"role": "system", "content": system}, {"role":"user", "content": prompt}
                  , {"role": "system", "content": system}],
        max_tokens=100,
        temperature=0.7)
    message = response.choices[0].message.content.strip()
    return message

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

class text(BaseModel):
    message: str

@app.post("/chat")
def prompt(text: text):
    response = chat_with_gpt(text.message)
    return(response)