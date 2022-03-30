import { usersData } from "./usersData.js";

export const allGamesData = { blank: {} };
export const scoreTurn = {};

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

export function createGameData(room) {
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
  scoreTurn[usersData[room].id].turn = true;
  scoreTurn[usersData[room].id].start = true;
}

export function deleteGameData(room) {
  delete allGamesData[room];
}

export function updateGamesData(dataHasWOn, room, user, usersData) {
  let data = dataHasWOn[0];
  let hasWon = dataHasWOn[1];
  if (scoreTurn[usersData[user].id].turn) {
    Object.keys(data).map((e) => {
      allGamesData[room][e] = data[e];
    });
    if (hasWon) {
      scoreTurn[usersData[user].id].score++;
    }
    Object.keys(usersData).map((e) => {
      if (usersData[e].room === room) {
        scoreTurn[usersData[e].id].turn = !scoreTurn[usersData[e].id].turn;
        console.log(scoreTurn[usersData[e].id], e);
      }
    });
  }
}
