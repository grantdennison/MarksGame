import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

//routes
import index from "./routes/index.js";
import { loginUser } from "./routes/functions/loginUser.js";
import { createUser } from "./routes/functions/createUser.js";
import { userStatus } from "./routes/functions/userStatus.js";
import { joinGame } from "./routes/functions/joinGame.js";
import { createGame } from "./routes/functions/createGame.js";
import savePhoto from "./routes/functions/savePhoto.js";
import { gameData } from "./routes/data/gameData.js";
import { usersData } from "./routes/data/userData.js";

const port = process.env.PORT || 4001;
const app = express();
// const cors = require("cors"); // not required by the look of it
app.use(index);
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

/// Send page status to user
const updateUser = (data, socket) =>
  socket.emit("UserStatus", userStatus(data));

io.on("connection", (socket) => {
  console.log(`New client connected`);
  // socket.join("Marks room"); //specify room
  // console.log(socket.rooms);
  // console.log(socket.id); //socket id

  /// CHeck password and login
  socket.on("LoginUsers", function (data, callback) {
    let res = loginUser(data, socket);
    if (res) updateUser(data, socket);
    if (usersData[data[0]].game) {
      io.to(usersData[data[0]].game).emit("GameUsers", [
        usersData[data[0]].game,
        gameData[usersData[data[0]].game].owner,
        gameData[usersData[data[0]].game].users
      ]);
    }
    callback(res);
  });
  ///Creat new user and login
  socket.on("CreateUsers", function (data, callback) {
    let res = createUser(data, socket);
    if (res) updateUser(data, socket);
    callback(res);
  });

  /// Check passcode and join game
  socket.on("JoinGame", function (data, callback) {
    //let user = data[0];
    let game = data[1];
    let res = joinGame(data, socket);
    if (res) {
      updateUser(data, socket);
      io.to(game).emit("GameUsers", [
        game,
        gameData[game].owner,
        gameData[game].users
      ]);
    }
    callback(res);
  });

  ///Creat new Game && join
  socket.on("CreateGame", function (data, callback) {
    let res = createGame(data, socket);
    if (res) {
      updateUser(data, socket);
      io.to(game).emit("GameUsers", [
        game,
        gameData[game].owner,
        gameData[game].users
      ]);
    }
    callback(res);
  });

  //Save photo to user Data
  socket.on("SubmitPhoto", function (data, callback) {
    let res = savePhoto(data, socket);
    if (res) updateUser(data, socket);
    callback(res);
  });

  //User disconnected
  socket.on("disconnect", () => {
    // SocketClosed(socket.id);
    console.log(`Client disconnected ${port}`);
    // clearInterval(interval);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
