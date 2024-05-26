const http = require("http");
const { WebSocketServer } = require("ws");
const url = require("url");
const uuidv4 = require("uuid").v4;

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = "8080";

let clients = {};

wsServer.on("connection", (ws, request) => {
  const { username } = url.parse(request.url, true).query;
  const uuid = uuidv4();
  console.log(`User ${username} connected`);
  console.log(uuid);

  clients[uuid] = { ws, username };

  ws.on("message", (message) => {
    broadcastMessage(username, message.toString());
  });

  ws.on("close", () => {
    console.log(`User ${username} disconnected`);
    delete clients[uuid];
    broadcastOnlineUsers();
  });

  broadcastOnlineUsers();
});

function broadcastMessage(username, message) {
  const data = {
    type: "message",
    data: {
      timestamp: new Date().toLocaleTimeString(),
      username: username,
      message: message,
    },
  };
  for (let client in clients) {
    clients[client].ws.send(JSON.stringify(data));
  }
}

function broadcastOnlineUsers() {
  const onlineUsers = Object.values(clients).map((client) => client.username);
  for (let client in clients) {
    clients[client].ws.send(
      JSON.stringify({ type: "online_users", users: onlineUsers })
    );
  }
}

server.listen(port, () => {
  console.log(`Websocket server is running on port ${port}`);
});
