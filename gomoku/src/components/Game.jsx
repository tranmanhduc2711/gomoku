import React, { useState } from "react";
import Board from "./Board";
import { calculateStatus } from ".././js/function";

const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array.from(Array(5), () => new Array(5).fill(null)),
      xLocation: null,
      yLocation: null,
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [isXNext, setIsXNext] = useState(true);
  const [isAsc, setIsAsc] = useState(true);

  const current = history[stepNumber];
  const gameCondition = calculateStatus(
    current.squares,
    current.xLocation,
    current.yLocation
  );

  const moves = history.map((step, move) => {
    const desc = move
      ? `Go to move #${move}, location: (${step.yLocation}, ${step.xLocation})`
      : "Go to game start";
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          className={move === stepNumber ? "move-selected" : ""}
        >
          {desc}
        </button>
      </li>
    );
  });

  const sortedMoves = isAsc ? moves : moves.reverse();

  let status;
  if (gameCondition.status === "win") {
    status = `Winner: ${gameCondition.winner}`;
  } else if (gameCondition.status === "draw") {
    status = "Draw!";
  } else {
    status = `Next player: ${isXNext ? "X" : "O"}`;
  }

  const handleClick = (xLocation, yLocation) => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.map((row) => [...row]);

    if (
      calculateStatus(squares, current.xLocation, current.yLocation).status ||
      squares[xLocation][yLocation]
    ) {
      return;
    }

    squares[xLocation][yLocation] = isXNext ? "X" : "O";
    setHistory([
      ...currentHistory,
      {
        squares: squares,
        xLocation: xLocation,
        yLocation: yLocation,
      },
    ]);
    setStepNumber(currentHistory.length);
    setIsXNext((isXNext) => !isXNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setIsXNext(step % 2 === 0);
  };

  const handleSort = () => {
    setIsAsc((isAsc) => !isAsc);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(xLocation, yLocation) => handleClick(xLocation, yLocation)}
          winLine={gameCondition.winLine}
        />
      </div>
      <div className="game-options">
        <div className="text">Options:</div>
        <button onClick={() => handleSort()}>
          Sort by {isAsc ? "Descending" : "Ascending"}
        </button>
      </div>
      <div className="game-info">
        <div className="text">{status}</div>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
};

export default Game;
