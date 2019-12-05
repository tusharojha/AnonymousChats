//Make Connection
var socket = io.connect(
  "http://tusharchatapp.herokuapp.com:" + window.location.port + "/"
);
//Query DOM
var message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

btn.addEventListener("click", function() {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
  message.value = "";
});
message.addEventListener("keypress", function() {
  if (handle.value != "") {
    socket.emit("typing", handle.value);
  } else {
    alert("Please Enter your name first!");
  }
});

//listen for events
socket.on("chat", function(data) {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});
//listen for events
socket.on("typing", function(data) {
  feedback.innerHTML = "<p><em>" + data + " is typing a message..</em></p>";
});
