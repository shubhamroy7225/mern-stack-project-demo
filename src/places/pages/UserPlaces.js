import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import PlaceList from "../components/PlaceList";

const UserPlaces = (props) => {
  const [places, setPlaces] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const id = useParams().userId;
  useEffect(() => {
    const getAllPlacesByUserId = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${id}`,
          "GET"
        );
        setPlaces(response);
      } catch (err) {}
    };
    getAllPlacesByUserId();
  }, [sendRequest, id]);
  const onDeletePlace = (id) => {
    setPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== id));
  };
  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && places && (
        <PlaceList items={places} onDeletePlace={onDeletePlace} />
      )}
    </>
  );
};

export default UserPlaces;
