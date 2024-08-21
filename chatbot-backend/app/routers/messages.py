from fastapi import APIRouter, HTTPException
from app.models import Message, MessageCreate
from typing import List
from app.utils.logger import logger
from app.utils.chatbot import get_chatbot_response, reset_chatbot
from app.utils.database import load_messages, save_messages, clear_messages
from uuid import uuid4

router = APIRouter()

# Load messages from JSON file on startup
messages: List[Message] = load_messages()

@router.post("/messages")
def create_message(message: MessageCreate):
    if not message.content.strip():
        raise HTTPException(status_code=400, detail="Message content cannot be empty.")
    
    # Create and save the user's message with a unique ID
    user_message = Message(id=str(uuid4()), content=message.content, sender='user')
    logger.info(f"Received message content: {user_message.content}")
    messages.append(user_message)
    
    # Generate and save the chatbot's response
    chatbot_response = get_chatbot_response(message.content)
    bot_message = Message(id=str(uuid4()), content=chatbot_response, sender='bot')
    messages.append(bot_message)
    
    save_messages(messages)
    
    return {"response": chatbot_response}

@router.get("/messages")
def get_messages():
    return {"messages": messages}

# Not used on UI
@router.put("/messages/{message_id}")
def update_message(message_id: str, message: MessageCreate):
    if not message.content.strip():
        raise HTTPException(status_code=400, detail="Message content cannot be empty.")
    
    logger.info(f"Updating message with id {message_id} to new content: {message.content}")
    for msg in messages:
        if msg.id == message_id:
            msg.content = message.content
            msg.edited = True
            save_messages(messages)
            return msg
    
    raise HTTPException(status_code=404, detail="No message found with this ID.")

@router.delete("/messages/{message_id}")
def delete_message(message_id: str):
    logger.info(f"Deleting message with id {message_id}")
    global messages
    updated_messages = [msg for msg in messages if msg.id != message_id]
    
    if len(updated_messages) == len(messages):
        raise HTTPException(status_code=404, detail="No message found with this ID.")
    
    messages = updated_messages
    save_messages(messages)
    
    return {"response": "Message deleted successfully"}

@router.post("/messages/reset")
def reset_history():
    global messages
    messages = []
    clear_messages()
    reset_chatbot()
    logger.info("Chat history reset successfully.")
    
    return {"response": "Message history cleared successfully"}
