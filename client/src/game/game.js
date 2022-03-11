import React, { Component } from "react";
import "./game.css";
import Board from "../board/board";

// check if there is a winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

//Check if its still possible to win
function calculateStillWin(squares) {
  let xWinner = squares.map((i) => (i === null ? `X` : i));
  let oWinner = squares.map((i) => (i === null ? `O` : i));
  if (calculateWinner(xWinner) || calculateWinner(oWinner)) {
    return true;
  }
  return false;
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      toggleState: true,
    };
  }

  handleClick(i, h) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const colRow = h;

    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const draw = calculateStillWin(current.squares);
    if (calculateWinner(squares) || squares[i] || !draw) {
      return;
    }
    squares[i] = this.state.xIsNext ? `X` : `O`;
    this.setState({
      history: history.concat([
        {
          squares: squares,
          colRow: colRow,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTp(step) {
    if (step === 0) {
      this.setState({
        history: [
          {
            squares: Array(9).fill(null),
          },
        ],
        stepNumber: step,
        xIsNext: step % 2 === 0,
      });
    }

    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  toggle(tog) {
    this.setState({
      toggleState: !tog,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const draw = calculateStillWin(current.squares);
    const len = history.length;
    const moves = history.map((step, move) => {
      if (!this.state.toggleState && move !== 0) move = len - move;
      const desc = move ? `Go to move # ${move} ${step.colRow}` : false;
      if (desc) {
        return (
          <li key={move}>
            <button
              onClick={() => this.jumpTp(move)}
              style={
                move === this.state.stepNumber
                  ? { fontWeight: "bold" }
                  : { fontWeight: "normal" }
              }
            >
              {desc}
            </button>
          </li>
        );
      } else {
        return (
          <li key={move}>
            <button
              onClick={() => this.jumpTp(move)}
              style={
                move === this.state.stepNumber
                  ? { fontWeight: "bold" }
                  : { fontWeight: "normal" }
              }
            >
              {"Restart Game!"}
            </button>
            <button
              className="toggle-button"
              onClick={() => this.toggle(this.state.toggleState)}
            >
              {"⇅"}
            </button>
          </li>
        );
      }
    });

    let status;
    if (winner) {
      status = `🎉🎉Winner ${current.squares[winner[0]]}🎉🎉`;
    } else if (!draw) {
      status = `😔Draw😔`;
    } else {
      status = `Player ${this.state.xIsNext ? `X` : `O`} your move!`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i, h) => this.handleClick(i, h)}
            winner={winner ? winner : [9, 9, 9]}
          />
        </div>
        <div className="game-info">
          <div className="game-player">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
