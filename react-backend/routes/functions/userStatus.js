import { usersData } from "../data/userData.js";
/// check user status

export function userStatus(data) {
  let user = data[0];
  let password = data[1];
  if (usersData[user].active === false) return [1]; //Login Page
  else if (usersData[user].game === false) return [2, user]; // Join Page
  else return [3, user]; // Game page
}
