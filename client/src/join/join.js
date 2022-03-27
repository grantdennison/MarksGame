import React, { useState, useEffect } from "react";
import { socket } from "../index";
import "./join.css";
import {
  OfflineUsers,
  OnlineUsers,
  JoinUserPopup,
  logUserOff,
  joinUserWindow,
} from "./userStatus";

export default function Join(props) {
  const [joinPage, setJoinPage] = useState("off");
  const [users, setUsers] = useState([]);
  const [online, setOnline] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [joinPopup, setJoinPopup] = useState(["off"]);
  const [joinPopupUser, setJoinPopupUser] = useState([""]);
  const [teamPlaying, setTeamPlaying] = useState([]);

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
      ///check if active user connected
      Object.keys(onlineUsers).forEach((e) => {
        if (onlineUsers[e].id === socket.id) {
          logged = true;
          setCurrentUser(e);
          curRoom = onlineUsers[e].room;
        } else {
          onUser[e] = onlineUsers[e];
          actRoom.push(onlineUsers[e].room);
        }
      });
      setOnline(onUser);
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

    //Ask user to jin room
    socket.on("AskToJoinRoom", function (users) {
      setTeamPlaying(users);
      setJoinPopupUser(users[0]);
      ///set window visiable
      setJoinPopup(`on`);
      /*////create timeout
    #####
    ####
    ###
    ##
    #
    ##
    ###
    ####
    #####
    */
    });
    ///Refused to join roof
    socket.on("RequestRefused", (data) => {
      let user = data[0];
      let reason = data[1];
      if (reason === `No`) {
        console.log(`${user[1]} refused to accept your challenge`);
        // alert(`${user} refused to accept your challenge`);
      } else {
        alert(`No response from ${user}`);
      }
    });
  }, []);

  /// logoff user
  const logCurrentOff = (user) => {
    socket.emit("LogoutUser", user);
  };

  ////React join page
  return (
    <div className={`join-sheet-${joinPage}`}>
      <div className={`join-user-popup-${joinPopup}`}>
        <h1 className="join-user-popup-heading">{`${joinPopupUser} wants to challeng you to a game of TikTacToe.`}</h1>
        <p className="join-user-popup-para">Do you accept this challenge?</p>
        <button
          className="join-popup-yes"
          onClick={() => {
            socket.emit("SetRoom", [teamPlaying, `Yes`]);
            setJoinPopup(`off`);
          }}
        >
          YES
        </button>
        <button
          className="join-popup-no"
          onClick={() => {
            socket.emit("SetRoom", [teamPlaying, `No`]);
            console.log(`clicked no`);
            setJoinPopup(`off`);
          }}
        >
          NO
        </button>
      </div>
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
