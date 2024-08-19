# Chatbot Widget Backend

This project is a backend implementation for a chatbot widget using FastAPI. The API supports creating, updating, retrieving, and deleting messages, and includes CORS handling to allow communication with a frontend client.

## Table of Contents

- [Chatbot Widget Backend](#chatbot-widget-backend)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [API Endpoints](#api-endpoints)
      - [1. Create Message](#1-create-message)
        - [Request Body:](#request-body)
        - [Response:](#response)
      - [2. Get Messages](#2-get-messages)
        - [Request Body:](#request-body-1)
        - [Response Body:](#response-body)
      - [3. Update Message](#3-update-message)
        - [Request Body:](#request-body-2)
        - [Response Body:](#response-body-1)
      - [4. Delete Message](#4-delete-message)
        - [Request Body:](#request-body-3)
        - [Response Body:](#response-body-2)


## Getting Started

### Prerequisites

Make sure you have Python 3.8+ installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/An0n-hunT3r/chatbot-backend.git
   cd chat-widget/chatbot-backend
   ```

2. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

3. Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```

4. Running the Application (Start the FastAPI server)
    ```bash
    uvicorn app.main:app --reload
    ```

Access the API documentation at http://127.0.0.1:8000/docs.

### API Endpoints

#### 1. Create Message

- **URL:** `/messages/`
- **Method:** `POST`

##### Request Body:

```json
{
  "content": "Your message here"
}
```

##### Response:
```json
{
  "message": {
    "id": 1,
    "content": "Your message here",
    "edited": false
  },
  "response": "This is a chatbot response."
}
```

#### 2. Get Messages

- **URL:** `/messages/`
- **Method:** `GET`

##### Request Body:

##### Response Body:

```json
[
  {
    "id": 1,
    "content": "Your message here",
    "edited": false
  }
]
```

#### 3. Update Message

- **URL:** `/messages/{message_id}`
- **Method:** `PUT`

##### Request Body:
```json
{
  "content": "Updated message content"
}
```

##### Response Body:

```json
{
  "id": 1,
  "content": "Updated message content",
  "edited": true
}
```

#### 4. Delete Message

- **URL:** `/messages/{message_id}`
- **Method:** `DELETE`

##### Request Body:

##### Response Body:

```json
{
  "detail": "Message deleted"
}
```