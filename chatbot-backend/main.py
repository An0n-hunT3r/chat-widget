from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import logging

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the request model
class MessageCreate(BaseModel):
    content: str

# Define the message model
class Message(MessageCreate):
    id: int
    edited: bool = False

# In-memory database
messages: List[Message] = []
message_id = 0

@app.post("/messages/")
def create_message(message: MessageCreate):
    global message_id
    message_id += 1
    logger.info(f"Received message content: {message.content}")  # Log the content
    new_message = Message(id=message_id, content=message.content)
    messages.append(new_message)
    return {"message": new_message, "response": "This is a chatbot response."}

@app.get("/messages/")
def get_messages():
    return messages

@app.put("/messages/{message_id}")
def update_message(message_id: int, message: MessageCreate):
    logger.info(f"Updating message with id {message_id} to new content: {message.content}")
    for msg in messages:
        if msg.id == message_id:
            msg.content = message.content
            msg.edited = True
            return msg
    raise HTTPException(status_code=404, detail="Message not found")

@app.delete("/messages/{message_id}")
def delete_message(message_id: int):
    logger.info(f"Deleting message with id {message_id}")
    global messages
    messages = [msg for msg in messages if msg.id != message_id]
    return {"detail": "Message deleted"}
