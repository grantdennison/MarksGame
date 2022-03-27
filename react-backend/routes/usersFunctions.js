import { usersData } from "./usersData.js";
import { createGameData, deleteGameData } from "./gameData.js";

export let users = Object.keys(usersData);

//Creat new user and update users
export function createUser(data, id) {
  let user = Object.keys(data);
  usersData[user] = {
    id: id,
    active: true,
    password: data[user],
    loginAttempts: 3,
    room: false,
  };
  users = Object.keys(usersData);
}

//Login users
export function userLogin(data, id) {
  let user = Object.keys(data);
  if (
    data[user] === usersData[user].password &&
    usersData[user].loginAttempts > 0
  ) {
    usersData[user].loginAttempts = 3;
    usersData[user].active = true;
    usersData[user].id = id;

    return true;
  } else {
    usersData[user].loginAttempts--;
    return usersData[user].loginAttempts;
  }
}

////Users currently logged on
export function usersLoggedOn(socket) {
  let activeUsers = {};
  let offlineUsers = [];
  console.log(socket.rooms);
  Object.keys(usersData).forEach((e) => {
    // if (usersData[e].active && usersData[e].room !== false) {
    //   usersData[e].id.join(`${usersData[e].room}`);
    // }
    if (usersData[e].active) {
      activeUsers[e] = {
        id: usersData[e].id,
        room: usersData[e].room,
      };
    } else {
      offlineUsers.push(e);
    }
  });
  return [offlineUsers, activeUsers];
}

// User closed page or refreshed
export function SocketClosed(id) {
  Object.keys(usersData).forEach((e) => {
    if (usersData[e].id === id) {
      usersData[e].active = false;
      deleteRoom(e);
    }
  });
}

//// User logged off
export function loggedOff(user) {
  usersData[user].id = ``;
  usersData[user].active = false;
  deleteRoom(user);
}

/////create room
export function createRoom(users) {
  let room = users[0];
  users.map((e) => {
    usersData[e].room = room;
  });
  createGameData(room);
}

////delete room
const deleteRoom = (user) => {
  let curRoom = usersData[user].room;
  deleteGameData(curRoom);
  Object.keys(usersData).map((e) => {
    if (usersData[e].room === curRoom) {
      usersData[e].room = false;
    }
  });
  usersData[user].room = false;
};
