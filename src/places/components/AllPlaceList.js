import React from "react";
import Card from "../../shared/components/UIElements/Card/Card";
import "./PlaceList.css";
import Button from "../../shared/components/FormElements/Button/Button";
import AllPlaceItem from "./AllPLacesItem";

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
    <ul className="place-list">
      {props.items.map((place) => {
        return (
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
          />
        );
      })}
    </ul>
  );
};
export default AllPlaceList