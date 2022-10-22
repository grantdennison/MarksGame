import React from "react";

export default function Testing(props) {
  const users = [`Grant`, `Mark`, `Simon`, `Leigh`, `Nicole`];

  const listUsers = users.map((user) => (
    <button
      key={user.toString()}
      onClick={() => {
        props.setName(user);
        props.setPassword(`1111`);
      }}
    >
      {user}
    </button>
  ));

  return (
    <div>
      <p style={{ fontSize: 15 }}>For testing only Please delete</p>
      <ul>*{listUsers}*</ul>
      <button
        key={"createUserTest"}
        onClick={() => {
          props.setName(
            `User Test ${(Math.random() + 1).toString().substring(3, 7)}`
          );
          props.setPassword(`1111`);
          props.setCreate(true);
        }}
      >
        Create user - test
      </button>
    </div>
  );
}
