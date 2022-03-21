import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import index from "./routes/index.js";
const port = process.env.PORT || 4001;
import { gameData } from "./routes/gameData.js";
import {
  createUser,
  userLogin,
  usersLoggedOn,
  SocketClosed,
} from "./routes/usersFunctions.js";
const app = express();
// const cors = require("cors"); // not required by look of it
app.use(index);
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// ///Send all user account names
// const updateCurrentUser = () => io.emit("CurrentUsers", users);

/// Send all logged on users
const loggedOn = () => io.emit("LoggedOn", usersLoggedOn());

io.on("connection", (socket) => {
  console.log(`New client connected`);
  // socket.join("Grants room"); //specify room
  // console.log(socket.rooms);
  // console.log(socket.id); //socket id

  ///Game data update
  socket.on("UpdateData", (data) => {
    gameData = data;
    io.emit("GameData", gameData);
  });

  ///Add user and password
  socket.on("UpdateUsers", (data) => {
    createUser(data, socket.id);
    loggedOn();
  });
  ///Current users
  loggedOn();

  /// CHeck password and login
  socket.on("LoginUsers", function (data, callback) {
    let res = userLogin(data, socket.id);
    if (res === true) loggedOn();
    callback(res);
  });

  socket.on("disconnect", () => {
    SocketClosed(socket.id);
    loggedOn();
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
