import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Adjust to your FastAPI backend URL

export const fetchMessages = async () => {
  const response = await axios.get(`${API_URL}/messages`);
  return response.data.messages;
};

export const sendMessage = async (content: string) => {
  const response = await axios.post(`${API_URL}/messages`, { content });
  return response.data;
};

export const resetMessages = async () => {
  const response = await axios.post(`${API_URL}/messages/reset`);
  return response.data;
};
