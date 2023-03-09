var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
const PORT = process.env.PORT || 2323;

var path = require("path");
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});
users = [];
io.on("connection", function (socket) {
  console.log("A user connected");
  socket.on("setUsername", function (data) {
    console.log(data);
    if (users.indexOf(data) > -1) {
      socket.emit(
        "userExists",
        data + " username is taken! Try some other username."
      );
    } else {
      users.push(data);
      socket.emit("userSet", { username: data });
    }
  });
  socket.on("msg", function (data) {
    //Send message to everyone
    io.sockets.emit("newmsg", data);
  });
});
http.listen(PORT, function () {
  console.log("listening on localhost:3000");
});
