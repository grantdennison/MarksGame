import React, { useState, useEffect } from "react";

let onlineUsers = [];
let offlineUsers = [];

export function usersLoggedOn(offAct) {
  offlineUsers = offAct[0];
  onlineUsers = offAct[1];
  console.log(offlineUsers);
  console.log(onlineUsers);
}

export function OfflineUsers(props) {
  return <p>{Object.keys(offlineUsers)}</p>;
}
export function OnlineUsers(props) {
  return <p>{Object.keys(onlineUsers)}</p>;
}
