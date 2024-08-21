import json
import os
from typing import List
from uuid import UUID
from app.models import Message

DB_FILE = "messages.json"

def uuid_to_str(obj):
    if isinstance(obj, UUID):
        return str(obj)
    raise TypeError(f"Object of type {obj.__class__.__name__} is not serializable")

def str_to_uuid(dct):
    for key, value in dct.items():
        if key == 'id' and isinstance(value, str):
            try:
                dct[key] = UUID(value)
            except ValueError:
                pass
    return dct

def load_messages() -> List[Message]:
    if os.path.exists(DB_FILE):
        try:
            with open(DB_FILE, "r") as f:
                messages = json.load(f, object_hook=str_to_uuid)
                return [Message(**msg) for msg in messages]
        except json.JSONDecodeError:
            return []
    return []

def save_messages(messages: List[Message]):
    with open(DB_FILE, "w") as f:
        json.dump([msg.dict() for msg in messages], f, default=uuid_to_str)

def clear_messages():
    if os.path.exists(DB_FILE):
        os.remove(DB_FILE)
