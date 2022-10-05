import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import socketIOClient from "socket.io-client";
import "./index.css";

//Import web pages
import Login from "./login/login";
import Join from "./join/join";
import Room from "./room/room";

const ENDPOINT = "http://localhost:4001/";
export const socket = socketIOClient(ENDPOINT);

ReactDOM.render(
  <React.StrictMode>
    <Room />
    <Login />
    <Join />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
