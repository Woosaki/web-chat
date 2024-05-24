import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const Home = ({ username }) => {
  const WS_URL = "ws://localhost:8080";

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    queryParams: { username },
  });

  useEffect(() => {
    if (lastMessage !== null) {
      console.log(lastMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: lastMessage.data, timestamp: new Date().toLocaleTimeString() },
      ]);
    }
  }, [lastMessage]);

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
          <li key={index}>
            [{message.timestamp}] {message.text}
          </li>
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
    </div>
  );
};

export default Home;
