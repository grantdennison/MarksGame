import React, { useState, useEffect, createContext } from "react";
import Testing from "./testing.js";
import "./login.css";
import { socket } from "../index";

export default function Login(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [create, setCreate] = useState(false);
  const [loginPage, setLoginPage] = useState("on");
  const [users, setUsers] = useState([`Grant`, `Nicole`]);
  const [online, setOnline] = useState([]);

  useEffect(() => {
    socket.on("LoggedOn", (offAct) => {
      let logged = false;
      let offlineUsers = offAct[0];
      let onlineUsers = offAct[1];

      setUsers(offlineUsers);
      setOnline(Object.keys(onlineUsers));
      Object.keys(onlineUsers).forEach((e) => {
        if (onlineUsers[e].id === socket.id) {
          logged = true;
        }
      });
      logged ? setLoginPage("off") : setLoginPage("on");
    });
  }, []);

  ////Handle username text box
  const handleChange = (e) => {
    if (e && e.slice(-1) === ` `) {
      alert(`No spaces allowed`);
    } else if (e.length > 8) {
    } else if (e) {
      setName(e[0].toUpperCase() + e.slice(1).toLowerCase());
    } else if (e.length > 8) {
    } else {
      setName(e);
    }
    console.log(`capital ${name}`);
  };
  ///handle password text box
  const handleChangePassword = (e) => {
    if (e && e.slice(-1) === ` `) {
      alert(`No spaces allowed`);
    } else if (e.length > 6) {
    } else {
      setPassword(e);
    }
  };

  /// Submit button
  const handleSubmit = (e) => {
    if (password.length < 4) alert(`Password must be 4 characters or more!`);
    else if (name.length < 4) alert(`Username must be 4 characters or more!`);
    ///////creat new user
    else if (create) {
      let obj = {};
      obj[name] = password;
      socket.emit("CreateUsers", obj, function (res) {
        if (res === false) alert(`User name ${name} is already taken`);
      });
    }
    ///login user
    else {
      let obj = {};
      obj[name] = password;
      socket.emit("LoginUsers", obj, function (res) {
        if (res === true) {
          setName("");
          setPassword("");
          alert(`you are logged in`);
        } else if (res === false) {
          alert(`User does not exist`);
        } else {
          alert(
            res <= 0
              ? `Your account is locked please contact Admin`
              : `Password incorrect Please Try Again:
                Number of guesses left = ${res}`
          );
        }
      });
    }
  };

  const createUser = () => {
    setName("");
    setPassword("");
    setCreate(!create);
  };

  return (
    <div
      className={`login-sheet-${loginPage}`}
      // style={{ display: loginPage ? "visible" : "none" }}
    >
      <h1 className="login-welcome">Welcome to Mark's Game</h1>
      <h2 className="login-login">
        {create ? "Create New Account:" : "Please login:"}
      </h2>
      {/* testing only delete */}
      <Testing setName={setName} setPassword={setPassword} />

      <div className="login-form">
        <input
          placeholder="Username"
          value={name}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => handleChangePassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => handleSubmit()}>
          {create ? "Create" : "Submit"}
        </button>
      </div>
      <div>
        <p>Or:</p>
        <button onClick={() => createUser()}>
          {create ? "Existing user login" : "Creat new User"}
        </button>
      </div>
    </div>
  );
}
