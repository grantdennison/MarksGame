import { io } from "./index.js";

//routes
import loginUser from "./routes/functions/loginUser.js";
import createUser from "./routes/functions/createUser.js";
import userStatus from "./routes/functions/userStatus.js";
import joinGame from "./routes/functions/joinGame.js";
import createGame from "./routes/functions/createGame.js";
import savePhoto from "./routes/functions/savePhoto.js";
import gameStatus from "./routes/functions/gameStatus.js";

/// Send page status to user
const updateUser = (data, socket) =>
  socket.emit("UserStatus", userStatus(data));

/// Send photos all users in game
const updateGame = (game) => {
  io.to(game).emit("GameStatus", gameStatus(game));
};

io.on("connection", (socket) => {
  console.log(`New client connected`);
  // socket.join("Marks room"); //specify room
  // console.log(socket.rooms);
  // console.log(socket.id); //socket id

  /// CHeck password and login
  socket.on("LoginUsers", (data, callback) => {
    let page;
    let res = loginUser(data, socket);
    if (res) page = updateUser(data, socket);
    if (page[0] === 4) {
      updateGame(page[1]);
    }
    callback(res);
  });
  ///Creat new user and login
  socket.on("CreateUsers", async (data, callback) => {
    let res = await createUser(data, socket);
    console.log(res);
    if (res === true) updateUser(data, socket);
    callback(res);
  });

  /// Check passcode and join game
  socket.on("JoinGame", (data, callback) => {
    //let user = data[0];
    let game = data[1];
    let res = joinGame(data, socket);
    if (res) {
      updateUser(data, socket);
      updateGame(game);
    }
    callback(res);
  });

  ///Creat new Game && join
  socket.on("CreateGame", (data, callback) => {
    let game = data[1];
    let res = createGame(data, socket);
    if (res) {
      updateUser(data, socket);
      updateGame(game);
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
    console.log(`Client disconnected`);
    // clearInterval(interval);
  });
});
