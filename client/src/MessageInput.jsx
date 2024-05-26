import { useState } from "react";

const MessageInput = ({ sendMessage, readyState }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message !== "") {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <form id="message-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" disabled={readyState !== WebSocket.OPEN}>
        &uarr;
      </button>
    </form>
  );
};

export default MessageInput;
