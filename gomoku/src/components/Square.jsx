import React from "react";

function Square({ value, onClick, winSquare }) {
  return (
    <button
      className={winSquare ? "square win-square" : "square"}
      onClick={onClick}
      style={{}}
    >
      {value}
    </button>
  );
}

export default Square;
