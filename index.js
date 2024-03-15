const express = require("express");
const socket = require("socket.io");
const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log("server is listening on http://localhost:" + PORT);
});

// app.use(express.static("public"));
const path = require("path");

const sio = socket(server);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "/style.css"));
});
app.get("/client.js", (req, res) => {
  res.sendFile(path.join(__dirname, "/client.js"));
});

sio.on("connection", (client) => {
  console.log("we have a new client as id ", client.id);
  client.on("message", function (data) {
    sio.sockets.emit("new_msg", data);
  });
});
