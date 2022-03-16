const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 3001;
const index = require("./routes/index");

const app = express();
// const cors = require("cors"); // not required by look of it
app.use(index);
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let countAll = 0;
let interval;

io.on("connection", (socket) => {
  socket.join("Grants room"); //specify room
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  console.log(`New client connected ${interval}`);
  // console.log(socket.rooms);
  // console.log(socket.id); //socket id
  socket.on("PushCount", (count) => {
    globalCount(count);
  });
  io.emit("GlobalCount", countAll);

  socket.on("disconnect", () => {
    console.log(`Client disconnected ${interval}`);
    // clearInterval(interval);
  });
});

const globalCount = (count = 0) => {
  countAll += count;
  io.emit("GlobalCount", countAll);
};

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  io.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
