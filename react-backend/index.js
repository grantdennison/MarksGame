///Express imports
import { Router } from "express";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

//mongoDB imports
import mongoose from "mongoose";

///Express setup
const router = Router();

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

export const port = process.env.PORT || 4001;
const app = express();

app.use(router);
const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

server.listen(port, () => console.log(`Listening on port ${port}`));

///MongoDB setup
const mongoDB = `mongodb+srv://grantdennison:q1w2e3r4t5y6@gamingcluster.cfwr0o3.mongodb.net/marks-Game?retryWrites=true&w=majority`;

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`connected node`);
  })
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const usersDataSchema = new Schema({
  user: String,
  socketId: String,
  active: Boolean,
  password: String,
  loginAttempts: Number,
  game: {},
  socket: {},
  photo: {}
});

export const UserData = mongoose.model(`users`, usersDataSchema);
