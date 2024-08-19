import React, { useState, useEffect } from 'react';
import ChatInput from './ChatInput';
import Message from './Message';
import Loader from './Loader';
import { fetchMessages, sendMessage, resetMessages } from '../services/api';
import { Message as MessageType, Sender } from '../types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #fff;
`;

const ChatContainer: React.FC = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [input, setInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
  
    useEffect(() => {
      const loadMessages = async () => {
        const data = await fetchMessages();
        setMessages(data);
      };
      loadMessages();
    }, []);
  
    const handleSendMessage = async (content: string) => {
      const userMessage: MessageType = { id: messages.length + 1, content, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInput('');
      setLoading(true);
  
      const { response } = await sendMessage(content);
  
      // Simulate letter-by-letter response
      let idx = 0;
      let botResponse = '';
      const interval = setInterval(() => {
        botResponse += response[idx];
        idx++;
        setMessages(prevMessages => [
          ...prevMessages,
          { id: messages.length + 2, content: botResponse, sender: 'bot' }
        ]);
        if (idx >= response.length) {
          clearInterval(interval);
          setLoading(false);
        }
      }, 50);
    };
  
    const handleResetHistory = async () => {
      await resetMessages();
      setMessages([]);
    };
  
    return (
      <Container>
        <div>
          {messages.map(msg => (
            <Message key={msg.id} content={msg.content} sender={msg.sender} />
          ))}
          {loading && <Loader />}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && input) {
              handleSendMessage(input);
            }
          }}
        />
        <button onClick={() => handleSendMessage(input)}>Send</button>
        <button onClick={handleResetHistory}>Reset History</button>
      </Container>
    );
  };
  
  export default ChatContainer;
