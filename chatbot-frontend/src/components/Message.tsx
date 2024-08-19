import React from 'react';
import { Message as MessageType, Sender } from '../types';
import styled from 'styled-components';

interface Props {
  content: string;
  sender: Sender;
}

const MessageContainer = styled.div<{ sender: Sender }>`
  /* Style based on sender */
  background-color: ${({ sender }) => sender === 'user' ? '#d0f0c0' : '#f0d0c0'};
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
`;

const Message: React.FC<Props> = ({ content, sender }) => (
  <MessageContainer sender={sender}>
    <strong>{sender === 'user' ? 'You' : 'Bot'}:</strong>
    <p>{content}</p>
  </MessageContainer>
);

export default Message;
