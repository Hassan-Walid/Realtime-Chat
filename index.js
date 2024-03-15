
const express = require("express");
const socket = require("socket.io");
const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log("server is listening on http://localhost:" + PORT);
});

app.use(express.static("public"));
const sio = socket(server);
sio.on("connection", (client) => {
  console.log("we have a new client as id ", client.id);
  client.on("message", function (data) {
    sio.sockets.emit("new_msg", data);
  });
});
