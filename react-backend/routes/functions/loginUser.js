import { usersData } from "../userData.js";

//Login users
export function loginUser(data, socket) {
  let user = Object.keys(data);
  if (!(user in usersData)) {
    return false;
  } else if (
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
