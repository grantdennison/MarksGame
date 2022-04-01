import { usersData } from "./usersData.js";

export const allGamesData = { blank: {} };
export const scoreTurn = {};
/// Score turn examply
/// socket.id{player: , score: , trun: , start:}

allGamesData.blank = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  stepNumber: 0,
  xIsNext: true,
  toggleState: true,
  gameDisplay: false,
};
export function restartGame(room) {
  allGamesData[room] = {
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
    toggleState: true,
    gameDisplay: true,
  };
}

export function createGameData(room) {
  restartGame(room);
  scoreTurn[usersData[room].id].turn = true;
  scoreTurn[usersData[room].id].start = true;
}

export function deleteGameData(room) {
  delete allGamesData[room];
}

export function updateGamesData(dataHasWon, room, user, usersData, socket) {
  let data = dataHasWon[0];
  let hasWon = dataHasWon[1];
  let current = scoreTurn[usersData[user].id];
  if (current.turn) {
    Object.keys(data).map((e) => {
      allGamesData[room][e] = data[e];
    });
    Object.keys(usersData).map((e) => {
      if (usersData[e].room === room) {
        console.log(usersData[e].id, socket.id);
        if (hasWon && socket.id === usersData[e].id) {
          console.log(`first`);
          current.score++;
          current.start = false;
          current.turn = false;
        } else if (hasWon) {
          console.log(`second`);
          scoreTurn[usersData[e].id].turn = true;
          scoreTurn[usersData[e].id].start = true;
        } else {
          scoreTurn[usersData[e].id].turn = !scoreTurn[usersData[e].id].turn;
        }

        console.log(scoreTurn[usersData[e].id], e);
      }
    });
  }
}
