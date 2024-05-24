import { useState } from "react";

const Login = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  return (
    <>
      <h1>Welcome</h1>
      <p>What should people call you?</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(username);
        }}
      >
        <input
          type="text"
          value={username}
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Join</button>
      </form>
    </>
  );
};

export default Login;
