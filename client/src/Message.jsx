const Message = ({ message, username }) => {
  return (
    <li className={`${message.username === username ? "my-message" : ""}`}>
      <div className="message-header">
        <span className="username">{message.username}</span>
        <span className="timestamp">{message.timestamp}</span>
      </div>
      <div className="message-content">{message.message}</div>
    </li>
  );
};

export default Message;
