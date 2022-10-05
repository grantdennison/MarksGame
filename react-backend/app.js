import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import index from "./routes/index.js";
const port = process.env.PORT || 4001;
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

  

 

    SocketClosed(socket.id);

    loggedOn(socket);
    console.log(`Client disconnected ${port}`);
    // clearInterval(interval);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
