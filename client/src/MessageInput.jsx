import { useState, useRef, useEffect } from "react";

const MessageInput = ({ sendMessage, readyState }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
        placeholder="Enter your message..."
        ref={inputRef}
      />
      <button type="submit" disabled={readyState !== WebSocket.OPEN}>
        &uarr;
      </button>
    </form>
  );
};

export default MessageInput;
