import React, { useState, useEffect } from "react";
import { socket } from "../index";
import "./join.css";

export default function Join(props) {
  const [joinPage, setJoinPage] = useState("off");
  const [game, setGame] = useState(``);
  const [passcode, setPasscode] = useState(``);
  const [user, setUser] = useState([]);
  const [create, setCreate] = useState(false);

  useEffect(() => {
    socket.on("UserStatus", (page) => {
      setUser(page[1]);
      page[0] === 2 ? setJoinPage(`on`) : setJoinPage(`off`);
    });
  }, []);

  ////Handle username text box
  const handleChange = (e) => {
    if (e && e.slice(-1) === ` `) {
      alert(`No spaces allowed`);
    } else if (e.length > 20) {
    } else {
      setGame(e);
    }
  };
  ///handle passcode text box
  const handleChangePasscode = (e) => {
    if (e && e.slice(-1) === ` `) {
      alert(`No spaces allowed`);
    } else if (e.length > 6) {
    } else {
      setPasscode(e);
    }
  };

  /// Submit button
  const handleSubmit = (e) => {
    if (passcode.length < 4) alert(`Passcode must be 4 characters or more!`);
    else if (game.length < 4) alert(`Game name must be 4 characters or more!`);
    ///////creat new user
    else if (create) {
      socket.emit("CreateGame", [user, game, passcode], function (res) {
        if (res === false) alert(`Game name ${game} is already taken`);
      });
    }
    ///login user
    else {
      socket.emit("JoinGame", [user, game, passcode], function (res) {
        if (res === true) {
          setGame("");
          setPasscode("");
        } else if (res === false) {
          alert(`Game does not exist`);
        } else {
          alert(`Passcode incorrect Please Try Again`);
        }
      });
    }
  };

  ///Set the create status and empty fileds
  const createStatus = () => {
    setGame("");
    setPasscode("");
    setCreate(!create);
  };
  /// logoff user
  // const logCurrentOff = (user) => {
  //   socket.emit("LogoutUser", user);
  // };

  ////React join page
  return (
    <div
      className={`join-sheet-${joinPage}`}
      // style={{ display: loginPage ? "visible" : "none" }}
    >
      <h1 className="join-welcome">Welcome {user}</h1>
      <h2 className="join-join">
        {create ? "Create New Game:" : "Join an Existing game:"}
      </h2>
      <button
        onClick={() => {
          setGame(`MarksGame`);
          setPasscode(`1111`);
        }}
      >
        Test Game
      </button>
      <div className="game-form">
        <input
          placeholder="Game name"
          value={game}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Passcode"
          value={passcode}
          onChange={(e) => handleChangePasscode(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => handleSubmit()}>
          {create ? "Create" : "Submit"}
        </button>
      </div>
      <div>
        <p className="join-join">Or:</p>
        <button onClick={() => createStatus()}>
          {create ? "Join Existing Game" : "Creat New Game"}
        </button>
      </div>
    </div>
  );
}
