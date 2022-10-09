// create and login user
import { usersData } from "../data/userData.js";

export function createUser(data, socket) {
  if (data[0] in usersData) return false;
  let user = data[0];
  let password = data[1];

  usersData[user] = {
    id: socket.id,
    active: true,
    password: password,
    loginAttempts: 3,
    game: false,
    socket: socket,
    photo: false
  };
  return true;
}
