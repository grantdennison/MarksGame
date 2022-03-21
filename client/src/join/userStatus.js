import React, { useState, useEffect } from "react";

let onlineUsers = [];
let offlineUsers = [];

export function logUserOff(offAct) {
  offlineUsers = offAct[0];
  onlineUsers = offAct[1];
  console.log(offlineUsers);
  console.log(onlineUsers);
}

export function OfflineUsers(props) {
  let newList = props.users.map((user) => (
    <button className={`offline-button`} key={user.toString()}>
      {user}
    </button>
  ));
  return <ul>{newList}</ul>;
}

export function OnlineUsers(props) {
  let newList;
  if (props.online.length > 0) {
    newList = props.online.map((user) => (
      <button className={`online-button`} key={user.toString()}>
        {user}
      </button>
    ));
  } else {
    newList = `Sorry no active users`;
  }
  return <ul>{newList}</ul>;
}
