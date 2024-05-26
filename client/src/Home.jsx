import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const Home = ({ username }) => {
  const WS_URL = "ws://localhost:8080";

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { sendMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
    queryParams: { username },
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      if (lastJsonMessage.type === "message") {
        setMessages((prevMessages) => [...prevMessages, lastJsonMessage.data]);
      } else if (lastJsonMessage.type === "online_users") {
        setOnlineUsers([
          username,
          ...lastJsonMessage.users.filter((user) => user !== username),
        ]);
      }
    }
  }, [lastJsonMessage, username]);

  useEffect(() => {
    document.title = `Chat - ${username}`;
  }, [username]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage !== "") {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div>
      <div id="home-container">
        <section id="online-users-section">
          <h2>Online Users</h2>
          <ul id="online-users">
            {onlineUsers.map((user, index) => (
              <li
                style={{ color: index === 0 ? "#0784b5" : "#eee" }}
                key={index}
              >
                {user}
              </li>
            ))}
          </ul>
        </section>
        <section id="messages-section">
          <h2>Welcome to Web Chat</h2>
          <ul id="messages-list">
            {messages.map((message, index) => (
              <li
                key={index}
                className={`${
                  message.username === username ? "my-message" : ""
                }`}
              >
                <div className="message-header">
                  <span className="username">{message.username}</span>
                  <span className="timestamp">{message.timestamp}</span>
                </div>
                <div className="message-content">{message.message}</div>
              </li>
            ))}
          </ul>
          <form id="message-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" disabled={readyState !== WebSocket.OPEN}>
              &uarr;
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Home;
