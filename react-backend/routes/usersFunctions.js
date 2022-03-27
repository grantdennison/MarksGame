import { usersData } from "./usersData.js";
import { createGameData, deleteGameData, scoreTurn } from "./gameData.js";

export let users = Object.keys(usersData);

//Creat new user and update users
export function createUser(data, socket) {
  let user = Object.keys(data);
  usersData[user] = {
    id: socket.id,
    active: true,
    password: data[user],
    loginAttempts: 3,
    room: false,
    socket: socket,
  };
  users = Object.keys(usersData);
}

//Login users
export function userLogin(data, socket) {
  let user = Object.keys(data);
  if (
    data[user] === usersData[user].password &&
    usersData[user].loginAttempts > 0
  ) {
    usersData[user].loginAttempts = 3;
    usersData[user].active = true;
    usersData[user].id = socket.id;
    usersData[user].socket = socket;

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
}

/////create room
export function createRoom(users) {
  let room = users[0];
  users.map((e) => {
    scoreTurn[e] = { score: 0, turn: false, start: false };
    usersData[e].room = room;
    let socket = usersData[e].socket;
    socket.join(room);
  });
  createGameData(room);
}

////delete room
const deleteRoom = (user) => {
  let curRoom = usersData[user].room;
  deleteGameData(curRoom);
  Object.keys(usersData).map((e) => {
    if (usersData[e].room === curRoom && curRoom) {
      usersData[e].room = false;
      scoreTurn[e] = {};
      let socket = usersData[e].socket;
      socket.leave(user);
    }
  });
  usersData[user].room = false;
};

export function getUserRoom(socket) {
  let room;
  Object.keys(usersData).map((e) => {
    if (socket.id === usersData[e].id) {
      room = usersData[e].room;
    }
  });
  return room;
}
export function getUser(socket) {
  let user;
  Object.keys(usersData).map((e) => {
    if (socket.id === usersData[e].id) {
      user = e;
    }
  });
  return user;
}
