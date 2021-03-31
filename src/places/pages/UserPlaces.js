import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHttpClient } from '../../shared/components/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import PlaceList from "../components/PlaceList"

const UserPlaces = (props) => {
    const [places,setPlaces]=useState([])
    const {isLoading,error,sendRequest,clearError} = useHttpClient()
    useEffect(()=>{
        let id = props.match.params.userId
        const getAllPlacesByUserId= async () => {
            try {
              const response = await sendRequest(`http://localhost:5001/api/places/user/${id}`, "GET");
              setPlaces(response)
            } catch (err) {}
          };
          getAllPlacesByUserId();
    },[sendRequest])
     const id = useParams().userId
    const loadPlaces = places.filter(place=>place.creator === id) 
    return (
        <>
        {error && <ErrorModal error={error} onClear={clearError} />}
        {isLoading && <LoadingSpinner asOverlay/>}
        {!isLoading && places && <PlaceList items={places} />}
        </>
    );
};

export default UserPlaces;