/// user default status
let userStatus = { Grant: false, Nicole: false, Simon: false };

export function setStatus(users) {
  users.forEach((user) => {
    if (!userStatus.hasOwnProperty(user)) {
      userStatus[user] = false;
    }
  });
}
