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

  clients[uuid] = ws;

  ws.on("message", (message) => {
    for (let client in clients) {
      clients[client].send(`${username}: ${message}`);
    }
  });

  ws.on("close", () => {
    console.log(`User ${username} disconnected`);
    delete clients[uuid];
  });
});

server.listen(port, () => {
  console.log(`Websocket server is running on port ${port}`);
});
