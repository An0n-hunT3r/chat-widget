from fastapi import APIRouter, HTTPException
from app.models import Message, MessageCreate
from typing import List
from app.utils.logger import logger
from app.utils.chatbot import get_chatbot_response, reset_chatbot
from app.utils.database import load_messages, save_messages, clear_messages

router = APIRouter()

# Load messages from JSON file on startup
messages: List[Message] = load_messages()
message_id = max([msg.id for msg in messages], default=0)

@router.post("/messages")
def create_message(message: MessageCreate):
    global message_id
    message_id += 1
    logger.info(f"Received message content: {message.content}")
    
    # Create and save the user's message
    user_message = Message(id=message_id, content=message.content, sender='user')
    messages.append(user_message)
    
    # Generate and save the chatbot's response
    chatbot_response = get_chatbot_response(message.content)
    message_id += 1
    bot_message = Message(id=message_id, content=chatbot_response, sender='bot')
    messages.append(bot_message)
    
    # Persist all messages
    save_messages(messages)
    
    return {"response": chatbot_response}

@router.get("/messages")
def get_messages():
    return {"messages": messages}

# Not used on UI
@router.put("/messages/{message_id}")
def update_message(message_id: int, message: MessageCreate):
    logger.info(f"Updating message with id {message_id} to new content: {message.content}")
    for msg in messages:
        if msg.id == message_id:
            msg.content = message.content
            msg.edited = True
            save_messages(messages)
            return msg
    raise HTTPException(status_code=404, detail="No message found")

# Not used on UI
@router.delete("/messages/{message_id}")
def delete_message(message_id: int):
    logger.info(f"Deleting message with id {message_id}")
    global messages
    messages = [msg for msg in messages if msg.id != message_id]
    save_messages(messages)
    return {"response": "Message deleted successfully"}

@router.post("/messages/reset")
def reset_history():
    global messages
    messages = []
    clear_messages()
    reset_chatbot()
    return {"response": "Message history cleared successfully"}
