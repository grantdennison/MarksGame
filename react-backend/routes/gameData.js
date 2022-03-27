export const allGamesData = { blank: {} };

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
}

export function deleteGameData(room) {
  delete allGamesData[room];
}

export function updateGamesData(data, room) {
  Object.keys(data).map((e) => {
    allGamesData[room][e] = data[e];
  });
}
