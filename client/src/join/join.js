import React, { useState, useEffect } from "react";
import { socket } from "../index";
import "./join.css";
import { OfflineUsers, OnlineUsers, logUserOff } from "./userStatus";

export default function Join(props) {
  const [joinPage, setJoinPage] = useState("off");
  const [users, setUsers] = useState([]);
  const [online, setOnline] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    socket.on("LoggedOn", (offAct) => {
      let logged = false;
      let onUser = [];
      let offlineUsers = offAct[0];
      let onlineUsers = offAct[1];
      setUsers(Object.keys(offlineUsers));
      Object.keys(onlineUsers).forEach((e) => {
        if (onlineUsers[e].id === socket.id) {
          logged = true;
          setCurrentUser(e);
        } else {
          onUser.push(e);
        }
      });
      setOnline(onUser);
      if (logged) {
        setJoinPage("on");
      } else {
        setCurrentUser([]);
        setJoinPage("off");
      }
    });
  }, []);
  /// logoff user
  const logCurrentOff = (user) => {
    socket.emit("LogoutUser", user);
  };

  ////React join page
  return (
    <div
      className={`join-sheet-${joinPage}`}
      //   style={{ display: joinPage ? "visible" : "none" }}
    >
      <h1 className={`join-welcome`}>{`${currentUser}:`}</h1>
      <p style={{ fontSize: 20 }}>{`select your opponent!`}</p>
      <div className="container">
        <div className="box">
          <u>Offline Users:</u>
          <OfflineUsers users={users} />
        </div>
        <div className="box">
          <u>Online Users:</u>
          <OnlineUsers online={online} />
        </div>
        <button
          onClick={() => logCurrentOff(currentUser)}
          className="logoff-button"
        >
          Log off: {currentUser}
        </button>
      </div>
    </div>
  );
}
