import React from "react";

export default function UsersPlaying(props) {
  const users = Object.keys(props.userPhotos);

  console.log(users);
  const listUsers = users.map((user) => (
    <div key={user.toString()} className="photo-container">
      <img
        key={user.toString() + "1"}
        className="photo"
        src={props.userPhotos[user]}
        alt={user}
      ></img>
      <h1 key={user.toString() + "2"} className="photo-text">
        {user}
      </h1>
    </div>
  ));

  return <div className="photos-layout">{listUsers}</div>;
}
