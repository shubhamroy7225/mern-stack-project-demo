import React from "react";
import Card from "../../shared/components/UIElements/Card/Card";
import UserItem from "./UserItem";
import "./UsersList.css";
const UsersList = (props) => {
  console.log(props)
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No user found.</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {props.items.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            user={user.name}
            places={user.places.length}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
