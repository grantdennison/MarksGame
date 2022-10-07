import { usersData } from "../userData.js";
/// check user status

export function userStatus(data) {
  let user = Object.keys(data);
  if (usersData[user].active === false) return 0; //Login Page
  else if (usersData[user].room === false) return 1; // Join Page
  else return 3; // Game page
}
