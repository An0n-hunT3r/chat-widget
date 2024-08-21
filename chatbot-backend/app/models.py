from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class MessageCreate(BaseModel):
    content: str

class Message(MessageCreate):
    id: UUID
    edited: bool = False
    sender: str
