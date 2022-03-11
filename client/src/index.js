/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/

//#########################################################################//
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

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

class Board extends React.Component {
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

class Game extends React.Component {
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

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

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

reportWebVitals();
