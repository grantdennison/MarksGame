import { usersData } from "../data/userData.js";
/// check user status

export function userStatus(data) {
  let user = data[0];
  if (usersData[user].active === false) return [1]; //Login Page
  else if (usersData[user].photo === false) return [2, user]; // Camera Page
  else if (usersData[user].game === false) return [3, user]; // Join Page
  else return [4, user]; // Game page
}
