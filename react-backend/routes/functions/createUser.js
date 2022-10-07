// create and login user
import { usersData } from "../userData.js";

export function createUser(data, socket) {
  let user = Object.keys(data);
  usersData[user] = {
    id: socket.id,
    active: true,
    password: data[user],
    loginAttempts: 3,
    room: false,
    socket: socket
  };
}
