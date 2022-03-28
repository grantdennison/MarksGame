import React, { useState, useEffect } from "react";
import "./game.css";
import { calculateWinner, calculateStillWin } from "./calWinner";
import Board from "../board/board";
import { socket } from "../index";

export default function Game(props) {
  const [curPlayer, setCurPlayer] = useState({});
  const [oponent, setOponent] = useState({});
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
      setValues(data[0]);
      let scores = data[1];
      console.log(scores);
      Object.keys(scores).map((e) => {
        console.log(e);
        if (e === socket.id) {
          console.log(123121312);
          setCurPlayer([scores[e].player, scores[e].score, scores[e].turn]);
        } else {
          setOponent([scores[e].player, scores[e].score]);
        }
      });
    });
  }, []);

  /// handle click event
  const handleClick = (i) => {
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
    };
    socket.emit("UpdateData", updateData);
  };

  const history = form.history;
  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);
  const draw = calculateStillWin(current.squares);

  let status;
  if (winner) {
    status = `🎉${!curPlayer[2] ? curPlayer[0] : oponent[0]} is the Winner🎉`;
  } else if (!draw) {
    status = `😔Draw😔`;
  } else {
    status = `${curPlayer[2] ? curPlayer[0] : oponent[0]} your move!`;
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
        {`${curPlayer[0]}: ${curPlayer[1]}    vs    ${oponent[0]}: ${oponent[1]}`}
        <div className="game-player">{status}</div>
      </div>
    </div>
  );
}
