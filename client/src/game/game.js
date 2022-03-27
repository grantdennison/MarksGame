import React, { useState, useEffect } from "react";
import "./game.css";
import { calculateWinner, calculateStillWin } from "./calWinner";
import Board from "../board/board";
import { socket } from "../index";

export default function Game(props) {
  const [form, setValues] = useState({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
    gameDisplay: false,
  });

  useEffect(() => {
    socket.on("GameData", (data) => {
      setValues(data);
      console.log(data);
      console.log(`222`);
    });
  }, []);

  /// handle click event
  const handleClick = (i) => {
    console.log(form);
    console.log(`lll`);
    const current = form.history[form.history.length - 1];
    const squares = current.squares.slice();
    const draw = calculateStillWin(current.squares);

    /// calculate if winner
    if (calculateWinner(squares) || squares[i] || !draw) {
      return;
    }
    squares[i] = form.xIsNext ? `X` : `O`;
    let updateData = {
      history: history.concat([
        {
          squares: squares,
        },
      ]),

      xIsNext: !form.xIsNext,
      gameDisplay: true,
    };
    socket.emit("UpdateData", updateData);
    // setValues({
    //   ...form,
    //   history: history.concat([
    //     {
    //       squares: squares,
    //       colRow: colRow,
    //     },
    //   ]),
    //   stepNumber: history.length,
    //   xIsNext: !form.xIsNext,
    // });
  };

  const history = form.history;
  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);
  const draw = calculateStillWin(current.squares);

  let status;
  if (winner) {
    status = `🎉🎉Winner ${current.squares[winner[0]]}🎉🎉`;
  } else if (!draw) {
    status = `😔Draw😔`;
  } else {
    status = `Player ${form.xIsNext ? `X` : `O`} your move!`;
  }

  return (
    <div className={`game-${form.gameDisplay ? "on" : "off"}`}>
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          winner={winner ? winner : [9, 9, 9]}
        />
      </div>
      <div className="game-info">
        <div className="game-player">{status}</div>
      </div>
    </div>
  );
}
