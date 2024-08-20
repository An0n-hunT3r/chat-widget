import React, { ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  flex: 1;
  margin-right: 10px;
`;

const SendIcon = styled.button<{ disabled: boolean }>`
  background: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ disabled }) => (disabled ? '#ccc' : '#007bff')};
  font-size: 24px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ disabled }) => (disabled ? '#ccc' : '#0056b3')};
  }
`;

interface ChatInputProps {
  input: string;
  onChange: (value: string) => void;
  onSend: (content: string) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, onChange, onSend, disabled }) => {
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
        placeholder="Ask me anything"
      />
      <SendIcon 
        type="button" 
        onClick={() => input.trim() && onSend(input)} 
        disabled={disabled}
        title="Send"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </SendIcon>
    </Form>
  );
};

export default ChatInput;
