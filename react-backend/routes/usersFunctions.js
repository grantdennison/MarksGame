// import { socket } from "../../client/src/index.js";
import { usersData } from "./usersData.js";

export let users = Object.keys(usersData);

//Creat new user and update users
export function createUser(data, id) {
  let user = Object.keys(data);
  usersData[user] = {
    id: id,
    active: true,
    password: data[user],
    loginAttempts: 3,
    room: ``,
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
export function usersLoggedOn() {
  let activeUsers = {};
  let offlineUsers = {};
  Object.keys(usersData).forEach((e) => {
    if (usersData[e].active) {
      activeUsers[e] = {
        id: usersData[e].id,
      };
    } else {
      offlineUsers[e] = {
        id: usersData[e].id,
      };
    }
  });
  return [offlineUsers, activeUsers];
}

// User closed page or refreshed
export function SocketClosed(id) {
  Object.keys(usersData).forEach((e) => {
    if (usersData[e].id === id) {
      usersData[e].active = false;
    }
  });
}

//// User logged off
export function loggedOff(user) {
  usersData[user].id = ``;
  usersData[user].active = false;
}
