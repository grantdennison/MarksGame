import { usersData } from "../data/userData.js";
import { UserData } from "../../index.js";

//Login users
export default async function loginUser(data, socket) {
  let user = data[0];
  let password = data[1];
  console.log(
    `testing login`,
    await UserData.findOne({ user: user, password: password })
  );
  if ((await UserData.find({ user: user }).count()) === 0) {
    return false;
  } else if (
    password ===
      (await UserData.find({ user: user }, { password: 1, _id: 0 })) &&
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
