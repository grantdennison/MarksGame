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
      let curRoom;
      let actRoom = [];
      let logged = false;
      let onUser = {};
      let offlineUsers = offAct[0];
      let onlineUsers = offAct[1];

      ////Set offline users
      setUsers(offlineUsers);
      console.log(onlineUsers);
      ///check if active user connected
      Object.keys(onlineUsers).forEach((e) => {
        if (onlineUsers[e].id === socket.id) {
          logged = true;
          setCurrentUser(e);
          curRoom = onlineUsers[e].room;
          console.log(curRoom);
        } else {
          onUser[e] = onlineUsers[e];
          actRoom.push(onlineUsers[e].room);
        }
      });
      console.log(curRoom, actRoom);
      setOnline(onUser);
      console.log(`online`, online);
      ////disply or hide depending id logged on
      if (logged && actRoom.includes(curRoom) && curRoom) {
        setJoinPage("off");
      } else if (logged) {
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
          <OnlineUsers online={online} currentUser={currentUser} />
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
