import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import AllPlaceList from "../components/AllPlaceList";
const AllPlaces = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [places, setPlaces] = useState([]);
  const [creator, setCreator] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/places",
          "GET"
        );
        console.log(response);
        setPlaces(response);
        response.map((item)=>{
          setCreator(creator.push(item.creator))
        })
      } catch (err) {}
    };
    getAllUsers();
  }, [sendRequest]);

  return (
    <div>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && places && <AllPlaceList items={places}/>}
    </div>
  );
};

export default AllPlaces;