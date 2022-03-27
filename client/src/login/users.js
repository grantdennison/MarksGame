import React from "react";

export default function UserList(props) {
  const users = props.users;
  const online = props.online;

  const handleClick = (user) => {
    props.setName(user);
    props.setCreate(false);
    //////////////testing only delet////
    if (user === `Grant`) {
      props.setPassword(`1111`);
    } else if (user === `Simon`) {
      props.setPassword(`2222`);
    } else if (user === `Nicole`) {
      props.setPassword(`4444`);
    }
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
