import React from "react";
import PlaceItem from "./PlaceItem";
import AllPlaceItem from "./AllPLacesItem";
import Card from "../../shared/components/UIElements/Card/Card";
import { Container, Row, Col } from 'react-grid-system';
import "./PlaceList.css";
import Button from "../../shared/components/FormElements/Button/Button";
const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No place found! maybe add place</h2>
          <Button to="/place/new">add place</Button>
        </Card>
      </div>
    );
  }
  return (
    <Container>
    <Row>
      {props.items.map((place) => {
        return (
          <Col sm={4}>
          <AllPlaceItem
            key={place.id}
            id={place.id}
            image={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            createId={place.creator}
            coordinates={place.location}
            onDelete={props.onDeletePlace}
            rating={place.total_rating}
            comment={place.comments}
          />
          </Col>
        );
      })}
      </Row>
</Container>
  );
};
export default PlaceList