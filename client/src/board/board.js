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
  const renderSquare = (i) => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        winner={props.winner.includes(i) ? true : false}
      />
    );
  };

  return (
    <div className="board-con">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
