from pydantic import BaseModel
from typing import Optional

class MessageCreate(BaseModel):
    content: str

class Message(MessageCreate):
    id: int
    edited: bool = False
    sender: str
