// create and login user
import { usersData } from "../data/userData.js";
import { gameData } from "../data/gameData.js";

export default function gameStatus(game, socket) {
  return [game, gameData[game].owner, gameData[game].users];
}
