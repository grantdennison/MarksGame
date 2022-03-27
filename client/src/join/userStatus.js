import React, { useState, useEffect } from "react";
import { socket } from "../index.js";

let onlineUsers = [];
let offlineUsers = [];

export function logUserOff(offAct) {
  offlineUsers = offAct[0];
  onlineUsers = offAct[1];
}

export function OfflineUsers(props) {
  let newList = props.users.map((user) => (
    <button className={`offline-button`} key={user.toString()}>
      {user}
    </button>
  ));
  return <ul>{newList}</ul>;
}

///Creat room and add two users to the room
const askUserToPlay = (addUser, curUser, room) => {
  if (room) {
    alert(
      `${addUser} is currently playing a game - Please wait till they are available`
    );
  } else {
    socket.emit("RequestUserToJoin", [curUser, addUser]);
  }
};

// export const AcceptJoin = (ans, users) => {
//   socket.emit("SetRoom", users);
// };

export function OnlineUsers(props) {
  let newList;
  if (Object.keys(props.online).length > 0) {
    newList = Object.keys(props.online).map((user) => (
      <button
        value={user}
        className={`online-button-${
          props.online[user].room === false ? "none" : "room"
        }`}
        key={user.toString()}
        onClick={(e) =>
          askUserToPlay(
            e.target.value,
            props.currentUser,
            props.online[user].room
          )
        }
      >
        {user}
      </button>
    ));
  } else {
    newList = `Sorry no active users`;
  }
  return <ul>{newList}</ul>;
}
