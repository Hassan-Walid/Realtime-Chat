var socket = io.connect("http://localhost:4000");

var username = document.getElementById("username");
var message = document.getElementById("message");
var send = document.getElementById("send");
var chat = document.getElementById("chat");

send.addEventListener("click", () => {
  socket.emit("message", {
    username: username.value,
    message: message.value,
  });
});

socket.on("new_msg", function (data) {
  console.log(data);
  chat.innerHTML += `
        <div class="container">
        <strong>Name:${data.username}</strong>
        <p>${data.message}</p>
        </div>`;
});
