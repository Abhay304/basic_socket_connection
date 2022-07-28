const express = require("express");
const http = require("http");

const socketIo = require("socket.io");

const port = 4001;

const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);

const io = socketIo(server);

let interval;
io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

let count = 0;
const getApiAndEmit = (socket) => {
  setInterval(() => {
    count++;
  }, 1000);
  socket.emit("Booking Services", count);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
