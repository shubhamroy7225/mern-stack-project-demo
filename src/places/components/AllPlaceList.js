import React from "react";
import Card from "../../shared/components/UIElements/Card/Card";
import "./PlaceList.css";
import Button from "../../shared/components/FormElements/Button/Button";
import AllPlaceItem from "./AllPLacesItem";
import { Container, Row, Col } from 'react-grid-system';
const AllPlaceList = (props) => {
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
            rating={place.total_rating}
            total_users_rated={place.total_users_rated}
            comment={place.comments}
            yourexprience={place.yourexprience}
            city={place.city}
            state={place.state}
            country={place.country}
          />
          </Col>
        );
      })}
  </Row>
</Container>
  );
};
export default AllPlaceList