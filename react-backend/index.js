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
const mongoDB = `mongodb+srv://grantdennison:q1w2e3r4t5y6@gamingcluster.cfwr0o3.mongodb.net/game-database?retryWrites=true&w=majority`;
mongoose
  .connect(mongoDB)
  .then(() => {
    console.log(`connected node`);
  })
  .catch((err) => console.log(err));

const msgSchema = new mongoose.Schema({
  userData: {
    type: String,
    require: true
  }
});

export const UserDataBase = mongoose.model(`user`, msgSchema);
