import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

//routes
import index from "./routes/index.js";
import { roomData } from "./routes/roomData.js";
import { loginUser } from "./routes/functions/loginUser.js";
import { createUser } from "./routes/functions/createUser.js";
import { usersData } from "./routes/userData.js";

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

/// Send all logged on users
const loggedOn = (socket) => io.emit("LoggedOn", usersLoggedOn(socket));

io.on("connection", (socket) => {
  console.log(`New client connected`);
  // socket.join("Marks room"); //specify room
  // console.log(socket.rooms);
  // console.log(socket.id); //socket id

  /// CHeck password and login
  socket.on("LoginUsers", function (data, callback) {
    let res = loginUser(data, socket);
    // if (res === true) loggedOn(socket);
    callback(res);
  });
  ///Creat new user and login
  socket.on("CreateUsers", function (data, callback) {
    if (Object.keys(data) in usersData) callback(false);
    else createUser(data, socket);
  });

  //User disconnected
  socket.on("disconnect", () => {
    // SocketClosed(socket.id);
    console.log(`Client disconnected ${port}`);
    // clearInterval(interval);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
