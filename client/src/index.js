import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import socketIOClient from "socket.io-client";
import "./index.css";

//Import web pages
import Login from "./login/login.js";
import Join from "./join/join.js";
import Game from "./game/game.js";
import Camera from "./camera/camera.js";

const ENDPOINT = "http://localhost:4001/";
export const socket = socketIOClient(ENDPOINT);

ReactDOM.render(
  <React.StrictMode>
    <Camera />
    <Game />
    <Login />
    <Join />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
