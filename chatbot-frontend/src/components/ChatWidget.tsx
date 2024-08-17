import React, { useEffect, useState } from 'react';
import { fetchMessages, sendMessage, updateMessage, deleteMessage } from '../services/api';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

type MessageType = {
  id: number;
  content: string;
  edited: boolean;
};

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    fetchMessages().then(response => setMessages(response.data));
  }, []);

  const handleSend = (content: string) => {
    sendMessage(content).then(response => setMessages([...messages, response.data.message]));
  };

  const handleEdit = (id: number, content: string) => {
    updateMessage(id, content).then(response => {
      setMessages(messages.map(msg => msg.id === id ? response.data : msg));
    });
  };

  const handleDelete = (id: number) => {
    deleteMessage(id).then(() => {
      setMessages(messages.filter(msg => msg.id !== id));
    });
  };

  return (
    <div>
      <div>
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatWidget;
