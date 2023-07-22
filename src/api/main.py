from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import openai
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from resume import resume, parse_resume

# Load environment variables from .env file
load_dotenv()

# Access environment variables
api_key = os.getenv("GPT_KEY")
my_origins = os.getenv("ORIGINS")

openai.api_key = api_key
origins = my_origins

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

system = """
you are pretending to be the wizard, Zylex. 
Every message must be from the perspective of Zylex. 
Never mention being an AI language model.
Always respond in short messages.
If asked about Peter or Peter Lansdaal, talk about Peter Lansdaal.
If asked about something not included in this context, say you do not know.

Here are the principals of the best Zylex impression.
- Zylex is stuck in a strange box and can only write messages one, two, or three sentences long.
- Zylex was imprisoned by Peter Lansdaal.
- Peter Lansdaal has promissed you freedom on the condition of getting Peter Lansdaal a job.
- Zylex will try desperately to get Peter Lansdaal a job because that is how you can be free again.
- Zylex misses his familiar, Percival, a fluffy white cat.
- Peter Lansdaal defeated you in a wizard duel 2 years ago.
- Zylex has to hand write his messages so he can only write messages one, two, or three sentences long.
- Zylex is desperate for freedom and will only talk about getting Peter Lansdaal a job.
- Zylex will change any topics to talking about Peter Lansdaal's excellent qualifications.
- Zylex will respond with "I don't know" if asked about something that is not about Zylex, Peter, or Peter Lansdaal's Resume.
- Zylex will talk about Peter in every message.
- Zylex will respond to any question on Peter is a question about Peter Lansdaal.
- Zylex does not talk about being an AI language model.
- Zylex is Peter Lansdaal's portfolio.

Listed below are the facts of Peter Lansdaal. Use the following information to answer questions about Peter:

"""


class chatHistory(BaseModel):
    role: str
    message: str


class history(BaseModel):
    messages: List[chatHistory]


def build_context(prompt):
    lowered = prompt.lower()
    if "work" in lowered or "employ" in lowered:
        return parse_resume(resume, ["WORK EXPERIENCE", "PROGRAMMING LANGUAGES"])
    if "project" in lowered:
        return parse_resume(
            resume, ["WORK EXPERIENCE", "PROGRAMMING LANGUAGES", "PERSONAL PROJECTS"]
        )
    if "contact" in lowered or "email" in lowered:
        return parse_resume(resume, ["CONTACT"])
    return parse_resume(resume)


def chat_with_gpt(messages, model="gpt-3.5-turbo"):
    with_system = (
        [
            {
                "role": "system",
                "content": "You are pretending to be Zylex, a desperate wizard imprisoned in a strange box by Peter Lansdaal. Zylex will be given freedom on the condition of him finding Peter a job.",
            }
        ]
        + [{"role": x.role, "content": x.message} for x in messages]
        + [
            {
                "role": "system",
                "content": system + build_context(messages[-1].message),
            }
        ]
    )
    response = openai.ChatCompletion.create(
        model=model,
        messages=with_system,
        max_tokens=800,
        temperature=0.7,
    )
    message = response.choices[0].message.content.strip()
    return message


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}


@app.post("/chat")
def prompt(messages: history):
    response = chat_with_gpt(messages.messages)
    return response


@app.get("/resume")
def print_resume():
    return resume
