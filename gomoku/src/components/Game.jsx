import React, { Component } from "react";
import Board from "./Board";
import { calculateStatus } from "../js/function";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array.from(Array(5), () => new Array(5).fill(null)),
          xLocation: null,
          yLocation: null,
        },
      ],
      stepNumber: 0,
      isXNext: true,
      isAsc: true,
    };
  }

  handleClick(xLocation, yLocation) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.map((row) => [...row]);

    if (
      calculateStatus(squares, current.xLocation, current.yLocation).status ||
      squares[xLocation][yLocation]
    ) {
      return;
    }

    squares[xLocation][yLocation] = this.state.isXNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          xLocation: xLocation,
          yLocation: yLocation,
        },
      ]),
      stepNumber: history.length,
      isXNext: !this.state.isXNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      isXNext: step % 2 === 0,
    });
  }

  handleSort = () => {
    this.setState({
      isAsc: !this.state.isAsc,
    });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const gameCondition = calculateStatus(
      current.squares,
      current.xLocation,
      current.yLocation
    );

    const moves = history.map((step, move) => {
      const desc = move
        ? `Move {${move}}, location: (${step.yLocation}, ${step.xLocation})`
        : "Restart";
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            className={move === this.state.stepNumber ? "move-selected" : ""}
          >
            {desc}
          </button>
        </li>
      );
    });

    const sortedMoves = this.state.isAsc ? moves : moves.reverse();

    let status;
    if (gameCondition.status === "win") {
      status = `~! WINNER: ${gameCondition.winner} !~`;
    } else if (gameCondition.status === "draw") {
      status = "~! DRAW !~";
    } else {
      status = `PLAYER: ${this.state.isXNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-options">
          <div className="text">Options:</div>
          <button onClick={() => this.handleSort()}>
            Sort by {this.state.isAsc ? "Descending" : "Ascending"}
          </button>
        </div>

        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(xLocation, yLocation) =>
              this.handleClick(xLocation, yLocation)
            }
            winLine={gameCondition.winLine}
          />
        </div>

        <div className="game-info">
          <div className="text">{status}</div>
          <ol style={{padding:15}}>{sortedMoves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
