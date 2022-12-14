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

const getApiAndEmit = (socket) => {
  socket.emit("Booking Services", { bookingCount: 100 });
};

server.listen(port, () => console.log(`Listening on port ${port}`));
