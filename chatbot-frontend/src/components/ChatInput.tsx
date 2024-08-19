import React, { ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const SendButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #0056b3;
  }
`;

interface ChatInputProps {
  input: string;
  onChange: (value: string) => void;
  onSend: (content: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, onChange, onSend }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder="Type your message..."
      />
      <SendButton type="submit">Send</SendButton>
    </Form>
  );
};

export default ChatInput;
