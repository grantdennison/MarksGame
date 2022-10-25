import { usersData } from "../data/userData.js";
import { UserData } from "../../index.js";
import { matchPassword } from "./password.js";

//Login users
export default async function loginUser(data, socket) {
  let user = data[0];
  let password = data[1];
  let userInfo = await UserData.findOne(
    {
      user: user
    },
    { password: 1, loginAttempts: 1, photo: 1 }
  ).catch((err) => {
    console.log(err);
    return false;
  });

  if (userInfo === false) return -1;
  if (userInfo) {
    const match = await matchPassword(userInfo.password, password);
    if (userInfo.loginAttempts-- > 0 && match) {
      //update database
      await UserData.updateOne(
        { user: user },
        {
          $set: {
            loginAttempts: 3,
            socketId: socket.id,
            active: true
          }
        }
      );
      //update server
      usersData[user] = {
        id: socket.id,
        active: true,
        game: false,
        socket: socket,
        photo: userInfo.photo
      };
      return true;
    } else {
      await UserData.updateOne(
        { user: user },
        { $set: { loginAttempts: userInfo.loginAttempts } }
      );
      return userInfo.loginAttempts;
    }
  } else return false; // user does not exist
}
