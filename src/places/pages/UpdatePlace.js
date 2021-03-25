import React, {useEffect, useState } from "react";
import { useParams } from "react-router";
import Button from "../../shared/components/FormElements/Button/Button";
import Input from "../../shared/components/FormElements/Input";
import "../../places/pages/FormPlace.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";
import { useForm } from "../../shared/components/hookS/form-hook";
import Card from "../../shared/components/UIElements/Card/Card";
const data = [
  {
    id: "p1",
    title: "Empire state building",
    description: "One of most famus sky scrapers in the world",
    imageUrl: "https://homepages.cae.wisc.edu/~ece533/images/zelda.png",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire . building",
    description: "One of most famus sky scrapers in the world",
    imageUrl: "https://homepages.cae.wisc.edu/~ece533/images/zelda.png",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];
const UpdatePlace = (props) => {
    const [isLoading,setIsLoading]=useState(true)
  const placeId = useParams().placeId;
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const placeData = data.find((place) => place.id === placeId);
  useEffect(() => {
      if(placeData){
    setFormData(
      {
        title: {
          value: placeData.title,
          isValid: true,
        },
        description: {
          value: placeData.description,
          isValid: true,
        },
      },
      true
    );
      }
    setIsLoading(false)
  }, [setFormData, placeData]);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  if (!placeData) {
    return  <div className="center">
    <Card>
    <h2>No places found.</h2>
    </Card>
  </div>
  }

  if (isLoading) {
    return <p>LOADING...</p>;
  }
  return (
    <form action="" className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
