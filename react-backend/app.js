const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const index = require("./routes/index");
const port = process.env.PORT || 4001;
let gameData = require("./routes/gameData");
let users = require("./routes/users");
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

io.on("connection", (socket) => {
  socket.join("Grants room"); //specify room
  console.log({ gameData });
  console.log(`New client connected bob`);
  // console.log(socket.rooms);
  // console.log(socket.id); //socket id
  socket.on("UpdateData", (data) => {
    gameData = data;
    io.emit("GameData", gameData);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected ${port}`);
    // clearInterval(interval);
  });
});

// const globalCount = () => {
//   io.emit("GlobalCount", countAll);
// };

// const getApiAndEmit = (socket) => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   io.emit("FromAPI", response);
// };

server.listen(port, () => console.log(`Listening on port ${port}`));
