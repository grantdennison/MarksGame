import React from "react";
import "./board.css";

function Square(props) {
  return (
    <button
      className="square"
      style={props.winner ? { background: "rgb(186, 224, 115)" } : {}}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default function Board(props) {
  const renderSquare = (i, h) => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i, h)}
        winner={props.winner.includes(i) ? true : false}
      />
    );
  };

  return (
    <div className="board-con">
      <div className="board-row">
        {renderSquare(0, `(1, 1)`)}
        {renderSquare(1, `(2, 1)`)}
        {renderSquare(2, `(3, 1)`)}
      </div>
      <div className="board-row">
        {renderSquare(3, `(1, 2)`)}
        {renderSquare(4, `(2, 2)`)}
        {renderSquare(5, `(3, 2)`)}
      </div>
      <div className="board-row">
        {renderSquare(6, `(1, 3)`)}
        {renderSquare(7, `(2, 3)`)}
        {renderSquare(8, `(3, 3)`)}
      </div>
    </div>
  );
}
