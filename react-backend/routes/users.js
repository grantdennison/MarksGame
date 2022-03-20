import { setStatus } from "./userRooms.js";

// Passwords//////
let passwords = {
  Grant: "1111",
  Nicole: "4444",
  Simon: "2222",
};
//Login attempts remaining
let loginAttemps = { Grant: 3, Nicole: 3, Simon: 3 };

const createLogonAttemps = (users) => {
  users.forEach((element) => {
    if (!loginAttemps.hasOwnProperty(element)) {
      loginAttemps[element] = 3;
    }
  });
};

// Export current users
export let users = [`Grant`, `Nicole`, `Simon`];

//Add new user and update users
export function createUser(userData) {
  passwords = { ...passwords, ...userData };
  users = Object.keys(passwords);
  createLogonAttemps(users);
  setStatus(users);
  console.log(passwords);
  console.log(users);
  console.log(loginAttemps);
}

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
