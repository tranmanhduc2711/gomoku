export const calculateStatus = (squares, xLocation, yLocation) => {
  const res = {
    status: null,
    winner: null,
    winLine: [],
  };

  if (xLocation === null || yLocation === null) {
    return res;
  }

  let winLine = [];
  for (let i = 0; i < squares.length; i++) {
    if (
      squares[xLocation][yLocation] &&
      squares[i][yLocation] !== squares[xLocation][yLocation]
    ) {
      break;
    }

    winLine.push({ xLocation: i, yLocation });

    if (i === squares.length - 1) {
      return {
        ...res,
        status: "win",
        winner: squares[xLocation][yLocation],
        winLine: winLine,
      };
    }
  }

  winLine = [];
  for (let i = 0; i < squares[xLocation].length; i++) {
    if (
      squares[xLocation][yLocation] &&
      squares[xLocation][i] !== squares[xLocation][yLocation]
    ) {
      break;
    }

    winLine.push({ xLocation, yLocation: i });

    if (i === squares[xLocation].length - 1) {
      return {
        ...res,
        status: "win",
        winner: squares[xLocation][yLocation],
        winLine: winLine,
      };
    }
  }

  if (xLocation === yLocation) {
    winLine = [];
    for (let i = 0; i < squares.length; i++) {
      if (
        squares[xLocation][yLocation] &&
        squares[i][i] !== squares[xLocation][yLocation]
      ) {
        break;
      }

      winLine.push({ xLocation: i, yLocation: i });

      if (i === squares.length - 1) {
        return {
          ...res,
          status: "win",
          winner: squares[xLocation][yLocation],
          winLine: winLine,
        };
      }
    }
  }

  if (xLocation === squares.length - 1 - yLocation) {
    winLine = [];
    for (let i = 0; i < squares.length; i++) {
      if (
        squares[xLocation][yLocation] &&
        squares[i][squares.length - 1 - i] !== squares[xLocation][yLocation]
      ) {
        break;
      }

      winLine.push({ xLocation: i, yLocation: squares.length - 1 - i });

      if (i === squares.length - 1) {
        return {
          ...res,
          status: "win",
          winner: squares[xLocation][yLocation],
          winLine: winLine,
        };
      }
    }
  }

  let checkDraw = true;

  drawChecking: for (let row = 0; row < squares.length; row++) {
    for (let col = 0; col < squares[row].length; col++) {
      if (!squares[row][col]) {
        checkDraw = false;
        break drawChecking;
      }
    }
  }
  if (checkDraw) res.status = "draw";

  return res;
};
