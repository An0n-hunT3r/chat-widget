import json
import os
from typing import List
from app.models import Message

DB_FILE = "messages.json"

# Load messages from file
def load_messages() -> List[Message]:
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r") as f:
            messages = json.load(f)
            return [Message(**msg) for msg in messages]
    return []

# Save messages to file
def save_messages(messages: List[Message]):
    with open(DB_FILE, "w") as f:
        json.dump([msg.dict() for msg in messages], f)

# Clear messages
def clear_messages():
    if os.path.exists(DB_FILE):
        os.remove(DB_FILE)
