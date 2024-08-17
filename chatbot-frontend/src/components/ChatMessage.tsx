import React from 'react';

type MessageType = {
  id: number;
  content: string;
  edited: boolean;
};

type ChatMessageProps = {
  message: MessageType;
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onEdit, onDelete }) => {
  return (
    <div>
      <p>{message.content}</p>
      <button onClick={() => onEdit(message.id, prompt('Edit message:', message.content) || message.content)}>Edit</button>
      <button onClick={() => onDelete(message.id)}>Delete</button>
    </div>
  );
};

export default ChatMessage;
