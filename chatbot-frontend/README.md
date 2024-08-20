# Chat Widget Frontend

This project is a chat widget frontend built with React and TypeScript. It provides an interactive chat interface with features such as sending messages, receiving responses from a chatbot, and resetting the chat history.

# Table of Contents

- [Chat Widget Frontend](#chat-widget-frontend)
- [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [API Integration](#api-integration)

## Installation

To get started with the project, follow these steps:

1. **Clone the Repository**
    ```bash
    git clone https://github.com/An0n-hunT3r/chat-widget-frontend.git
    cd chat-widget/chatbot-frontend
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Start the Development Server**
    ```bash
    npm start
    ```

## API Integration

This frontend interacts with a backend API for sending and receiving messages. The relevant API endpoints are:

- **POST /send**: Sends a message to the chatbot and receives a response.
- **GET /messages**: Fetches existing chat messages.
- **POST /reset**: Clears the chat history.

Ensure the backend API is running and accessible for the frontend to function correctly.
