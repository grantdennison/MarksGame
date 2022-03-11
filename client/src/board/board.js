import React, { Component } from "react";
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

class Board extends Component {
  renderSquare(i, h) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i, h)}
        winner={this.props.winner.includes(i) ? true : false}
      />
    );
  }

  render() {
    return (
      <div className="board-con">
        <div className="board-row">
          {this.renderSquare(0, `(1, 1)`)}
          {this.renderSquare(1, `(2, 1)`)}
          {this.renderSquare(2, `(3, 1)`)}
        </div>
        <div className="board-row">
          {this.renderSquare(3, `(1, 2)`)}
          {this.renderSquare(4, `(2, 2)`)}
          {this.renderSquare(5, `(3, 2)`)}
        </div>
        <div className="board-row">
          {this.renderSquare(6, `(1, 3)`)}
          {this.renderSquare(7, `(2, 3)`)}
          {this.renderSquare(8, `(3, 3)`)}
        </div>
      </div>
    );
  }
}

export default Board;
