import { usersData } from "../data/userData.js";
import { gameData } from "../data/gameData.js";

//Creat game, set owner and join
export function createGame(data, socket) {
  let user = data[0];
  let game = data[1];
  let passcode = data[2];
  if (game in gameData) return false;

  usersData[user].game = game;
  gameData[game] = {
    owner: user,
    users: {},
    drunk: [],
    killer: [],
    detective: [],
    normal: [],
    alive: [],
    dead: [],
    active: false,
    passcode: passcode
  };
  gameData[game].users[user] = usersData[user].photo;
  socket.join(game);
  return true;
}
