import React, { useState, useEffect } from "react";
import "./game.css";
import { socket } from "../index";

import UsersPlaying from "./bgUserPhotos.js";

export default function Game(props) {
  const [game, setGame] = useState("");
  const [user, setUser] = useState(``);
  const [owner, setOwner] = useState(``);
  const [userPhotos, setUserPhotos] = useState({});
  const [gamePage, setGamePage] = useState("off");

  /// Set page on user state
  useEffect(() => {
    // Set page number
    socket.on("UserStatus", (data) => {
      //data[0] = page data[1] = user data[2] = photo
      setUser(data[1]);
      data[0] === 4 ? setGamePage(`on`) : setGamePage(`off`);
    });
    /// Set game data
    socket.on("GameStatus", (data) => {
      //data[0] = game data[1] = owner data[2] = userphotos
      setGame(data[0]);
      setOwner(data[1]);
      setUserPhotos(data[2]);
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
      <h1>
        {game}
        <span> ~ {owner}</span>
      </h1>
      <UsersPlaying userPhotos={userPhotos} />
    </div>
  );
}
