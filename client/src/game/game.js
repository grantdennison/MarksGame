import React, { useState, useEffect } from "react";
import "./game.css";
import { socket } from "../index";

export default function Game(props) {
  const [game, setGame] = useState("");
  const [user, setUser] = useState(``);
  const [gamePage, setGamePage] = useState("off");

  useEffect(() => {
    socket.on("UserStatus", (page) => {
      page === 3 ? setGamePage(`on`) : setGamePage(`off`);
    });
  }, []);

  //Handle username text box
  const handleChange = (e) => {};
  //handle password text box
  const handleChangePasscode = (e) => {};

  // Submit button
  const handleSubmit = (e) => {};

  return (
    <div
      className={`game-sheet-${gamePage}`}
      // style={{ display: gamePage ? "visible" : "none" }}
    >
      <h1 className="game-welcome">Welcome to Mark's Game</h1>
    </div>
  );
}
