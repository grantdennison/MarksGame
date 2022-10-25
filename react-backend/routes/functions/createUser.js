// create and login user
import { usersData } from "../data/userData.js";
import { UserData } from "../../index.js";
import { hashPassword } from "./password.js";

export default async function createUser(data, socket) {
  //check user exists
  let passed = await UserData.find({ user: data[0] })
    .count()
    .catch((err) => {
      passed = -1;
    });

  // if (data[0] in usersData) return false;
  if (passed >= 1) return false;
  if (passed === -1) return passed; // failed to check user exists

  // create new user
  let user = data[0];
  let password = await hashPassword(data[1]);

  const creatUser = new UserData({
    user: user,
    socketId: socket.id,
    active: true,
    password: password,
    loginAttempts: 3,
    game: false,
    // socket: socket,
    photo: ""
  });

  await creatUser
    .save()
    .then(() => {
      usersData[user] = {
        id: socket.id,
        active: true,
        password: password,
        loginAttempts: 3,
        game: false,
        socket: socket,
        photo: ""
      };
      passed = true;
      console.log(`Successlly saved`);
    })
    .catch((err) => {
      // console.log(err);
      console.log(`Failed to save`);
      passed = 0;
    });
  console.log(`Last message`);
  console.log(passed);
  return passed;
}
