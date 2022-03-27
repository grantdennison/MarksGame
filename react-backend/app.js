import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import index from "./routes/index.js";
const port = process.env.PORT || 4001;
import { allGamesData, updateGamesData } from "./routes/gameData.js";
import { usersData } from "./routes/usersData.js";
import {
  createUser,
  userLogin,
  usersLoggedOn,
  SocketClosed,
  loggedOff,
  createRoom,
  getUserRoom,
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

/// Send all logged on users
const loggedOn = (socket) => io.emit("LoggedOn", usersLoggedOn(socket));

io.on("connection", (socket) => {
  console.log(`New client connected`);
  // socket.join("Grants room"); //specify room
  // console.log(socket.rooms);
  // console.log(socket.id); //socket id

  ///Game data update
  socket.on("UpdateData", (data) => {
    let room = getUserRoom(socket);
    if (room) {
      updateGamesData(data, room);
      Object.keys(allGamesData).map((e) => {
        io.in(e).emit(`GameData`, allGamesData[e]);
      });
    }
  });

  ///Add user and password
  socket.on("UpdateUsers", (data) => {
    createUser(data, socket);
    loggedOn(socket);
  });
  ///Current users
  loggedOn(socket);

  /// CHeck password and login
  socket.on("LoginUsers", function (data, callback) {
    let res = userLogin(data, socket);
    if (res === true) loggedOn(socket);
    callback(res);
  });

  //Request user to join room
  socket.on("RequestUserToJoin", (users) => {
    io.to(usersData[users[1]].id).emit("AskToJoinRoom", users);
  });

  ///add users to a room
  socket.on("SetRoom", (data) => {
    let users = data[0];
    let ans = data[1];
    if (ans === `Yes`) {
      createRoom(users);
      loggedOn(socket);
      Object.keys(allGamesData).map((e) => {
        io.in(e).emit(`GameData`, allGamesData[e]);
      });
    } else {
      io.to(usersData[users[0]].id).emit("RequestRefused", data);
    }
  });

  ///Log out current user
  socket.on("LogoutUser", function (data) {
    loggedOff(data);
    loggedOn(socket);
  });

  socket.on("disconnect", () => {
    let room = getUserRoom(socket);
    if (room) {
      io.in(room).emit("GameData", allGamesData.blank);
    }

    SocketClosed(socket.id);

    loggedOn(socket);
    console.log(`Client disconnected ${port}`);
    // clearInterval(interval);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
