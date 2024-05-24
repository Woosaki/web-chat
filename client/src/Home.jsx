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
      console.log(lastJsonMessage);
      if (lastJsonMessage.type === "message") {
        setMessages((prevMessages) => [...prevMessages, lastJsonMessage.data]);
      } else if (lastJsonMessage.type === "online_users") {
        setOnlineUsers(lastJsonMessage.users);
      }
    }
  }, [lastJsonMessage]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage !== "") {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div>
      <h1>Hello {username}</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" disabled={readyState !== WebSocket.OPEN}>
          Send
        </button>
      </form>
      <h2>Online Users</h2>
      <ul>
        {onlineUsers.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
