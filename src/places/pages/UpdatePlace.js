import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Button from "../../shared/components/FormElements/Button/Button";
import Input from "../../shared/components/FormElements/Input";
import "../../places/pages/FormPlace.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";
import { useForm } from "../../shared/components/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card/Card";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import { AuthContext } from "../../shared/components/context/auth-context";
const UpdatePlace = (props) => {
  const [placeData, setPlaceData] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  const placeId = useParams().placeId;
  const auth = useContext(AuthContext);
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

  useEffect(() => {
    const getPlaceByPlaceId = async () => {
      try {
        const response = await sendRequest(
          `http://localhost:5001/api/places/${placeId}`,
          "GET"
        );
        setPlaceData(response);
        setFormData(
          {
            title: {
              value: response.title,
              isValid: true,
            },
            description: {
              value: response.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    getPlaceByPlaceId();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5001/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
           Authorization:auth.token
        }
      );
      history.push("/" + auth.userId + "/places");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <p>
        {" "}
        <LoadingSpinner asOverlay />{" "}
      </p>
    );
  }
  if (!placeData) {
    return (
      <div className="center">
        <Card>
          <h2>No places found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <form
        action=""
        className="place-form"
        onSubmit={placeUpdateSubmitHandler}
      >
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={placeData.title}
          initialValid={true}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
          initialValue={placeData.description}
          initialValid={true}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form>
    </>
  );
};

export default UpdatePlace;
