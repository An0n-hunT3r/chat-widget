import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { fetchMessages, sendMessage, resetMessages } from '../services/api';
import { Message } from '../types';
import MessageComponent from './Message';
import Loader from './Loader';
import ChatInput from './ChatInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';

const CHATBOT_PROFILE_PIC = '/chatbot.png';
const USER_PROFILE_PIC = '/user.png';

const Container = styled.div`
  width: 500px;
  height: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Header = styled.div`
  text-align: center;
  padding: 16px;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background-color: #f5f5f5;
`;

const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #007bff;
  border: 1px solid #ddd;
`;

const Greeting = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Prompt = styled.div`
  font-size: 14px;
  color: #555;
`;

const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

const NoMessages = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  color: #888;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 16px;
  border-top: 1px solid #ddd;
  align-items: center;
  background-color: #f5f5f5;
`;

const ChatInputContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const ResetButton = styled.button<{ disabled: boolean }>`
  background: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ disabled }) => (disabled ? '#ccc' : '#ff5722')};
  font-size: 24px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  position: absolute;
  bottom: 10px;
  right: 10px;

  &:disabled {
    cursor: not-allowed;
    color: #ccc;
  }
`;

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const fetchedMessages: Message[] = await fetchMessages();
        setMessages(fetchedMessages);
        if (fetchedMessages.length > 0) {
          setNextId(Math.max(...fetchedMessages.map((msg) => msg.id)) + 1);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchAllMessages();
  }, []);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = { id: nextId, content, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNextId(nextId + 1);
    setInput('');
    setLoading(true);

    try {
      const { response } = await sendMessage(content);
      const botMessage: Message = { id: nextId, content: response, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setNextId(nextId + 1);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = async () => {
    try {
      await resetMessages();
      setMessages([]);
      setNextId(1);
    } catch (error) {
      console.error('Error resetting chat:', error);
    }
  };

  const isSendDisabled = !input.trim();

  return (
    <Container>
      <Header>
        <ProfileIcon src={CHATBOT_PROFILE_PIC} alt="Chatbot Icon" />
        <Greeting>Hey 👋, I'm Ava</Greeting>
        <Prompt>Ask me anything</Prompt>
      </Header>
      <MessageContainer>
        {messages.length === 0 && (
          <NoMessages>No chat history yet. Ask me something!</NoMessages>
        )}
        {messages.map((msg: Message) => (
          <MessageComponent 
            key={msg.id} 
            content={msg.content} 
            sender={msg.sender} 
            profilePic={msg.sender === 'user' ? USER_PROFILE_PIC : CHATBOT_PROFILE_PIC} 
          />
        ))}
        {loading && <Loader />}
        <div ref={endRef} />
        <ResetButton 
          onClick={handleResetChat} 
          disabled={messages.length === 0} 
          title="Reset chat"
        >
          <FontAwesomeIcon icon={faUndo} />
        </ResetButton>
      </MessageContainer>
      <InputContainer>
        <ChatInputContainer>
          <ProfileIcon src={USER_PROFILE_PIC} alt="User Icon" />
          <ChatInput 
            input={input} 
            onChange={setInput} 
            onSend={handleSendMessage}
            disabled={isSendDisabled}
          />
        </ChatInputContainer>
      </InputContainer>
    </Container>
  );
};

export default ChatContainer;
