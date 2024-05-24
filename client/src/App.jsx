import { useState } from "react";
import Login from "./Login";
import Home from "./Home";

const App = () => {
  const [username, setUsername] = useState("");

  return username ? (
    <Home username={username} />
  ) : (
    <Login onSubmit={setUsername} />
  );
};

export default App;
