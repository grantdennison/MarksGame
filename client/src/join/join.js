import React, { useState, useEffect } from "react";
import { socket } from "../index";
import "./join.css";
import { OfflineUsers, OnlineUsers } from "./userStatus";

export default function Join(props) {
  const [joinPage, setJoinPage] = useState(false);

  return (
    <div
      className="join-sheet"
      style={{ display: joinPage ? "visible" : "none" }}
    >
      <h1 className="join-welcome">Please select your opponent!</h1>
      <div className="container">
        <div className="box">
          <u>Offline Users:</u>
          <OfflineUsers />
        </div>
        <div className="box">
          <u>Online Users:</u>
          <OnlineUsers />
        </div>
      </div>
    </div>
  );
}
