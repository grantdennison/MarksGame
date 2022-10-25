import { usersData } from "../data/userData.js";
import { UserData } from "../../index.js";
//Save photo to person

export default async function savePhoto(data, socket) {
  let user = data[0];
  let url = data[1];
  console.log(
    `phototest`,
    await UserData.updateOne({ user: user }, { $set: { photo: url } })
  );
  usersData[user].photo = url;
  return true;
}
