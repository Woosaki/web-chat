import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import OnlineUsers from "./OnlineUsers";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const Home = ({ username }) => {
  const WS_URL = "ws://localhost:8080";

  const [messages, setMessages] = useState([]);
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

  return (
    <div>
      <div id="home-container">
        <OnlineUsers onlineUsers={onlineUsers} />
        <section id="messages-section">
          <h2>Welcome to Web Chat</h2>
          <MessageList messages={messages} username={username} />
          <MessageInput sendMessage={sendMessage} readyState={readyState} />
        </section>
      </div>
    </div>
  );
};

export default Home;
