import React from "react";
import Square from "./Square";

function Board({ squares, onClick, winLine }) {
  console.log(winLine);

  const renderBoard = () => {
    const board = squares.map((row, rowIndex) => (
      <div className="board-row" key={rowIndex}>
        {row.map((square, colIndex) => (
          <Square
            key={colIndex}
            value={square}
            onClick={() => onClick(rowIndex, colIndex)}
            winSquare={winLine.find(
              (item) =>
                item.xLocation === rowIndex && item.yLocation === colIndex
            )}
          />
        ))}
      </div>
    ));

    return board;
  };

  return <div>{renderBoard()}</div>;
}

export default Board;
