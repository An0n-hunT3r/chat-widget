import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div<{ sender: 'user' | 'bot' }>`
  display: flex;
  align-items: flex-start;
  flex-direction: ${({ sender }) => (sender === 'user' ? 'row-reverse' : 'row')};
`;

const Profile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 10px;
`;

const MessageBubble = styled.div<{ sender: 'user' | 'bot' }>`
  max-width: 70%;
  padding: 10px;
  border-radius: 12px;
  background-color: ${({ sender }) => (sender === 'user' ? '#e0f7fa' : '#f1f1f1')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

interface MessageProps {
  content: string;
  sender: 'user' | 'bot';
  profilePic: string;
}

const Message: React.FC<MessageProps> = ({ content, sender, profilePic }) => {
  return (
    <MessageContainer sender={sender}>
      <Profile src={profilePic} alt={`${sender} profile`} />
      <MessageBubble sender={sender}>{content}</MessageBubble>
    </MessageContainer>
  );
};

export default Message;
