import React, { useState, useEffect } from "react";
import UserList from "./users";
import "./login.css";
import { socket } from "../index";

export default function Login(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [create, setCreate] = useState(false);
  const [loginPage, setLoginPage] = useState(true);
  const [users, setUsers] = useState([`Grant`, `Nicole`]);

  useEffect(() => {
    socket.on("CurrentUsers", (data) => {
      setUsers(data);
    });
  }, []);

  ////Handle username text box
  const handleChange = (e) => {
    if (e && e.slice(-1) === ` `) {
      alert(`No spaces allowed`);
    } else if (e) {
      setName(e[0].toUpperCase() + e.slice(1).toLowerCase());
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
    if (!users.includes(name) && !create) alert(`User does not exist`);
    else if (password.length < 4)
      alert(`Password must be 4 characters or more!`);
    else if (name.length < 4) alert(`Username must be 4 characters or more!`);
    else if (create && users.includes(name)) alert(`User name already taken`);
    ///////creat new user
    else if (create) {
      let obj = {};
      obj[name] = password;
      socket.emit("UpdateUsers", obj);
    }
    ///login user
    else {
      let obj = {};
      obj[name] = password;
      socket.emit("LoginUsers", obj, function (res) {
        console.log(res);
        if (res === true) {
          setLoginPage(false);
        } else {
          alert(
            res === 0
              ? `Your account is locked please contact Admin`
              : `Password incorrect Please Try Again:
                Number of guesses left = ${res}`
          );
        }
      });
    }

    // setName("");
    // setPassword("");
  };

  const createUser = () => {
    setName("");
    setPassword("");
    setCreate(true);
  };

  return (
    <div
      className="login-sheet"
      style={{ display: loginPage ? "visible" : "none" }}
    >
      <h1 className="login-welcome">Welcome to TicTacToe</h1>
      <h2 className="login-login">
        {create ? "Create New Account:" : "Please login:"}
      </h2>
      <p>Select Current User:</p>
      <div>
        <UserList users={users} setName={setName} setCreate={setCreate} />
      </div>
      <div className="login-form">
        <input
          placeholder="username"
          value={name}
          onChange={(e) => handleChange(e.target.value)}
        />
        <input
          placeholder="password"
          value={password}
          onChange={(e) => handleChangePassword(e.target.value)}
        />
        <button onClick={() => handleSubmit()}>
          {create ? "Create" : "Submit"}
        </button>
      </div>
      <div>
        <p>Or:</p>
        <button onClick={() => createUser()}>Creat new account</button>
      </div>
    </div>
  );
}
