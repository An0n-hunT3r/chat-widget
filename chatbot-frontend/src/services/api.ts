import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

// Fetch messages
export const fetchMessages = () => api.get('/messages/');

// Send message
export const sendMessage = (content: string) => api.post('/messages/', { content });

// Update message
export const updateMessage = (id: number, content: string) => api.put(`/messages/${id}`, { content });

// Delete message
export const deleteMessage = (id: number) => api.delete(`/messages/${id}`);
