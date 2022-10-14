import { gameData } from "../data/gameData.js";
import { usersData } from "../data/userData.js";
///Check if room exists then join the room

export default function joinGame(data, socket) {
  let user = data[0];
  let game = data[1];
  let passcode = data[2];
  if (!(game in gameData)) return false; //game does not exist;
  else {
    if (passcode === gameData[game].passcode) {
      gameData[game].users[user] = usersData[user].photo;
      usersData[user].game = game;
      socket.join(game);
      return true;
    } else return 1; // Incorret passcode
  }
}
