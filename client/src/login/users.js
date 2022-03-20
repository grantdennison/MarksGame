import React from "react";

export default function UserList(props) {
  const users = props.users;

  const handleClick = (user) => {
    props.setName(user);
    props.setCreate(false);
  };

  const listUsers = users.map((user) => (
    <button
      style={{ padding: 10 }}
      key={user.toString()}
      onClick={() => handleClick(user)}
    >
      {user}
    </button>
  ));
  return <ul>{listUsers}</ul>;
}
