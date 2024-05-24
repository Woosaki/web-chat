import { useState, useRef, useEffect } from "react";

const Login = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div id="login-container">
      <h1>Welcome to Web Chat</h1>
      <p>Enter your username</p>
      <form
        id="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(username);
        }}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          ref={inputRef}
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export default Login;
