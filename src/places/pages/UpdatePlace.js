import React from 'react';
import { useParams } from 'react-router';
import Button from '../../shared/components/FormElements/Button/Button';
import Input from '../../shared/components/FormElements/Input';
import "../../places/pages/FormPlace.css"
import {  VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/util/validators';
const data=[
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
        title:'Empire state building',
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
const UpdatePlace = (props) => {
    const placeId = useParams().placeId
    const placeData = data.find(place=>place.id === placeId)
    if(!placeData){
        return <p>no places found!</p>
    }
    return (
       <form action="" className='place-form '>
          <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={()=>{}}
        value={placeData.title}
        valid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={()=>{}}
        value={placeData.description}
        valid={true}
      />
      <Button type="submit" disabled={true}>
        UPDATE PLACE   
      </Button>
       </form>
    );
};

export default UpdatePlace;