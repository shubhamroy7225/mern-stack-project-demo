import React from "react";
import PlaceItem from "./PlaceItem";
import Card from '../../shared/components/UIElements/Card/Card'
import "./PlaceList.css";
const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No place found! maybe add place</h2>
          <button>add place</button>
        </Card>
      </div>
    );
  }
 
  return (
    <ul className="place-list">
      {props.items.map((place) => {
        return <PlaceItem 
                key={place.id}
                id={place.id}
                image={place.imageUrl}
                title={place.title}
                description={place.description}
                address={place.address}
                createId={place.createId}
                coordinates={place.location}
        />;
      })}
    </ul>
  );
};

export default PlaceList;
