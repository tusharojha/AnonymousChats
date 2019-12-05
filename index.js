var express = require("express");
var socket = require("socket.io");
var port = process.env.PORT || 3000;
//App setup
var app = express();
var server = app.listen(port, function() {
  console.log("Listening to requests for port ", port);
});
const fs = require("fs");
fs.writeFile("./public/test", port.toString(), function(err) {
  if (err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});
//static files

app.use(express.static("public"));

//socket setup

var io = socket(server);

io.on("connection", function(socket) {
  console.log("made socket connection", socket.id);

  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});
