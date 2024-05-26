import Message from "./Message";

const MessageList = ({ messages, username }) => {
  return (
    <ul id="messages-list">
      {messages.map((message, index) => (
        <Message key={index} message={message} username={username} />
      ))}
    </ul>
  );
};

export default MessageList;
