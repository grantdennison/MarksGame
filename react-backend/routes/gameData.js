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
  scoreTurn[room].turn = true;
  scoreTurn[room].start = true;
}

export function deleteGameData(room) {
  delete allGamesData[room];
}

export function updateGamesData(data, room, user, usersData) {
  if (scoreTurn[user].turn) {
    Object.keys(data).map((e) => {
      allGamesData[room][e] = data[e];
    });
    Object.keys(usersData).map((e) => {
      if (usersData[e].room === room) {
        console.log(scoreTurn[e], e);
        scoreTurn[e].turn = !scoreTurn[e].turn;
        console.log(scoreTurn[e], e);
      }
    });
  }
}
