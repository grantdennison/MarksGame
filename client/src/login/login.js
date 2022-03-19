import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import UserList from "./users";
import "./login.css";

const ENDPOINT = "http://localhost:4001/";
const socket = socketIOClient(ENDPOINT);

export default function Game(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [create, setCreate] = useState(false);
  const [users, setUsers] = useState([`Grant`, `Nicole`, `Simon`]);
  useEffect(() => {
    socket.on("UserLogin", (data) => {
      setUsers(data);
    });
  }, []);

  const handleSubmit = (e) => {
    if (!users.includes(name)) alert(`User does not exist`);
    if (password === "") alert(`Password cannot be blank`);

    console.log(`Submit ${name} and ${password}`);

    setName("");
    setPassword("");

    // socket.emit("UpdateData", updateData);
  };

  const createUser = () => {
    setName("");
    setPassword("");
    setCreate(true);
  };

  let userLogin = true;

  return (
    <div
      className="login-sheet"
      style={{ display: userLogin ? "visible" : "none" }}
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
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
