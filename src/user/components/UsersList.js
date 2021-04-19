import React from "react";
import Card from "../../shared/components/UIElements/Card/Card";
import UserItem from "./UserItem";
import { Container, Row, Col } from 'react-grid-system';
import "./UsersList.css";
const UsersList = (props) => {
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
    <Container>
      <Row>
        {props.items.map((user) => {
          return (
            <Col sm={4}>
              <UserItem
                key={user.id}
                id={user.id}
                image={user.image}
                user={user.name}
                places={user.places.length}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default UsersList;
