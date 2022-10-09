import { usersData } from "../data/userData.js";
//Save photo to person

export default function savePhoto(data, socket) {
  let user = data[0];
  let url = data[1];
  usersData[user].photo = url;
  return true;
}
