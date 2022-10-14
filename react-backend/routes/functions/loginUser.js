import { usersData } from "../data/userData.js";

//Login users
export default function loginUser(data, socket) {
  let user = data[0];
  let password = data[1];

  if (!(user in usersData)) {
    return false;
  } else if (
    password === usersData[user].password &&
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
