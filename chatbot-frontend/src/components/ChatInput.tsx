import React, { useState } from 'react';

type ChatInputProps = {
  onSend: (content: string) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [content, setContent] = useState('');

  const handleSend = () => {
    if (content.trim()) {
      onSend(content);
      setContent('');
    }
  };

  return (
    <div>
      <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatInput;
