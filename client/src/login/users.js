import React from "react";

export default function UserList(props) {
  const users = props.users;
  const online = props.online;

  const handleClick = (user) => {
    props.setName(user);
    props.setCreate(false);
  };

  const listUsers = users.map((user) => (
    <button
      style={{ margin: 3, padding: 10, fontWeight: "bold", borderRadius: 12 }}
      key={user.toString()}
      onClick={() => handleClick(user)}
      className="user-buttons"
    >
      {user}
    </button>
  ));

  listUsers.push(
    online.map((user) => (
      <button
        style={{
          margin: 3,
          padding: 10,
          backgroundColor: "red",
          fontWeight: "bold",
          borderRadius: 12,
        }}
        key={user.toString()}
        onClick={() => alert(`Already logged in on another page`)}
      >
        {user}
      </button>
    ))
  );

  return <ul>{listUsers}</ul>;
}
