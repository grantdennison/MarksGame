import React from "react";

export default function UserList(props) {
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
    </div>
  );
}
