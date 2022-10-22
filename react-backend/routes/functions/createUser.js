// create and login user
import { usersData } from "../data/userData.js";
import { UserData } from "../../index.js";

export default async function createUser(data, socket) {
  //check user exists

  if (data[0] in usersData) return false;

  // create new user
  let user = data[0],
    password = data[1],
    passed = false;
  console.log("type", typeof socket);

  const creatUser = new UserData({
    user: user,
    socketId: socket.id,
    active: true,
    password: password,
    loginAttempts: 3,
    game: false,
    // socket: socket,
    photo: false
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
        photo: false
      };
      passed = true;
      console.log(`Successlly saved`);
    })
    .catch((err) => {
      // console.log(err);
      console.log(`Failed to save`);
      passed = false;
    });
  console.log(`Last message`);
  console.log(passed);
  return passed;
}
