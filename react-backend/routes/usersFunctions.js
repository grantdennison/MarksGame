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
  console.log(user);
  console.log(data[user]);
  console.log(usersData[user].password);

  if (
    data[user] === usersData[user].password &&
    usersData[user].loginAttempts > 0
  ) {
    usersData[user].loginAttempts = 3;
    return true;
  } else {
    usersData[user].loginAttempts--;
    return usersData[user].loginAttempts;
  }

  // if (logins <= 0) {
  //   return 0;
  // } else if (data[user] === passwords[user]) {
  //   logins = 3;
  //   return true;
  // } else if (logins) <= 1) {
  //   loginAttempts[user]--;
  //   return 0;
  // } else {
  //   loginAttempts[user]--;
  //   return loginAttempts[user];
  // }
}
