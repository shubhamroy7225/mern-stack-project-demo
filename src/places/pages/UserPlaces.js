import React from 'react';
import { useParams } from 'react-router';
import PlaceList from "../components/PlaceList"
const dummyPlaceData=[
    {
        id:'p1',
        title:'Empire state building',
        description:'One of most famus sky scrapers in the world',
        imageUrl:'https://homepages.cae.wisc.edu/~ece533/images/zelda.png',
        address:'20 W 34th St, New York, NY 10001',
        location:{
            lat:40.7484405,
            lng:-73.9878584
        },
        creator:'u1'
    },
    {
        id:'p2',
        title:'Empire.building',
        description:'One of most famus sky scrapers in the world',
        imageUrl:'https://homepages.cae.wisc.edu/~ece533/images/zelda.png',
        address:'20 W 34th St, New York, NY 10001',
        location:{
            lat:40.7484405,
            lng:-73.9878584
        },
        creator:'u2'
    }
]
const UserPlaces = () => {
    const id = useParams().userId
    const loadPlaces = dummyPlaceData.filter(place=>place.creator === id) 
    return (
        <PlaceList items={loadPlaces} />
    );
};

export default UserPlaces;