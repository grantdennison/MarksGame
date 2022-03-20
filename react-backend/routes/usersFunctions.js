import { usersData } from "./usersData.js";

//Add new user and update users
export function createUser(data, id) {
  let user = Object.keys(data);
  usersData[user] = {
    id: id,
    active: true,
    password: data[user],
    loginAttemps: 3,
    room: ``,
  };
  users = Object.keys(usersData);
}

export let users = Object.keys(usersData);

//Login users
export function userLogin(userData) {
  let user = Object.keys(userData);
  console.log(user);
  console.log(userData[user]);
  console.log(passwords[user]);
  if (loginAttemps[user] <= 0) {
    return 0;
  } else if (userData[user] === passwords[user]) {
    loginAttemps[user] = 3;

    return true;
  } else if (loginAttemps[user] <= 1) {
    loginAttemps[user]--;
    return 0;
  } else {
    loginAttemps[user]--;
    return loginAttemps[user];
  }
}
