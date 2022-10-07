import React, { useState, useEffect } from "react";
import "./room.css";
import { socket } from "../index";

export default function Room(props) {
  const [game, setGame] = useState("");
  const [passcode, setPasscode] = useState("");
  const [create, setCreate] = useState(false);
  const [roomPage, setroomPage] = useState("off");

  //   useEffect(() => {
  //     socket.on("LoggedOn", (offAct) => {
  //       let logged = false;
  //       let offlineUsers = offAct[0];
  //       let onlineUsers = offAct[1];

  //       setUsers(offlineUsers);
  //       setOnline(Object.keys(onlineUsers));
  //       Object.keys(onlineUsers).forEach((e) => {
  //         if (onlineUsers[e].id === socket.id) {
  //           logged = true;
  //         }
  //       });
  //       logged ? setroomPage("off") : setroomPage("on");
  //     });
  //   }, []);

  //Handle username text box
  const handleChange = (e) => {
    if (e.length > 20) {
    } else {
      setGame(e);
    }
  };
  //handle password text box
  const handleChangePasscode = (e) => {
    if (e && e.slice(-1) === ` `) {
      alert(`No spaces allowed`);
    } else if (e.length > 6) {
    } else {
      setPasscode(e);
    }
  };

  // Submit button
  const handleSubmit = (e) => {
    // if (online.includes(game)) {
    //   alert(`Already logged in on another page`);
    // } else if (!users.includes(game) && !create) alert(`User does not exist`);
    // else if (passcode.length < 4)
    //   alert(`Password must be 4 characters or more!`);
    // else if (game.length < 4) alert(`Username must be 4 characters or more!`);
    // else if (create && users.includes(name)) alert(`User name already taken`);
    // ///////creat new user
    // else if (create) {
    //   let obj = {};
    //   obj[game] = passcode;
    //   socket.emit("UpdateUsers", obj);
    // }
    // ///login user
    // else {
    //   let obj = {};
    //   obj[game] = passcode;
    //   socket.emit("LoginUsers", obj, function (res) {
    //     if (res === true) {
    //       setGame("");
    //       setPasscode("");
    //     } else {
    //       alert(
    //         res <= 0
    //           ? `Your account is locked please contact Admin`
    //           : `Passcode incorrect Please Try Again:
    //               Number of guesses left = ${res}`
    //       );
    //     }
    //   });
    // }
  };

  const creatRoom = () => {
    setGame("");
    setPasscode("");
    setCreate(!create);
  };

  return (
    <div
      className={`room-sheet-${roomPage}`}
      // style={{ display: roomPage ? "visible" : "none" }}
    >
      <h1 className="room-welcome">Welcome to Mark's Game</h1>
      <h2 className="room-login">
        {create ? "Create New Game:" : "Join Existing Game:"}
      </h2>
      <div>
        <div>
          <input
            placeholder="Game Name"
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
            {create ? "Create" : "Join"}
          </button>
        </div>
      </div>
      <div>
        <p>Or:</p>
        <button onClick={() => creatRoom()}>
          {create ? "Join existing game" : "Creat new Game"}
        </button>
      </div>
    </div>
  );
}
