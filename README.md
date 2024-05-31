# Web-Chat

Web-Chat is a straightforward web chat application developed with Node.js and React, leveraging WebSocket technology for instantaneous communication.

Initially conceived as an academic project, Web-Chat now offers a seamless chat experience with real-time messaging, a user-friendly interface, and efficient WebSocket connections.

## Features
- **Real-time messaging**: Communicate instantly with other users connected to the chat.
- **Simple interface**: A clean and intuitive UI for ease of use.
- **WebSocket connection**: Utilizes WebSocket protocol for efficient and low-latency communication.

## Installation

### Clone the repository:

    git clone https://github.com/your-username/web-chat.git
    
### Navigate to the server directory and install dependencies:

    cd web-chat/server
    npm install

### Start the server:

    node index.js

### In other termial window navigate to the client directory and install dependencies:

    cd ../client
    npm install

### Start the client:

    npm run dev

### Access the application in your web browser at http://localhost:5173.

## Usage
Enter your desired username and start chatting with other users.

For single user testing open new tab and write different username.

Messages are displayed in real-time as they are sent and received.

## Dependencies
#### Server
- **ws**: WebSocket server library for Node.js
- **uuid**: Library for generating universally unique identifiers.

#### Client
- **react**: A JavaScript library for building user interfaces.
- **react-dom**: Provides DOM-specific methods that can be used at the top level of your app.
- **use-websocket**: React hook for connecting and interacting with WebSocket APIs.
