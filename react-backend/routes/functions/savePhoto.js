import { usersData } from "../data/userData.js";
import { UserData } from "../../index.js";
//Save photo to person

export default async function savePhoto(data, socket) {
  let user = data[0];
  let url = data[1];
  let passed = false;
  await UserData.updateOne({ user: user }, { $set: { photo: url } })
    .then(() => {
      usersData[user].photo = url;
      passed = true;
    })
    .catch((err) => {
      passed = false;
    });

  return passed;
}
