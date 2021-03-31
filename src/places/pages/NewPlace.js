import React, { useContext } from 'react';
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button/Button'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/components/util/validators';
import './FormPlace.css';
import { useForm } from '../../shared/components/hooks/form-hook';
import { useHttpClient } from '../../shared/components/hooks/http-hook';
import { AuthContext } from '../../shared/components/context/auth-context';
import { Redirect, useHistory } from 'react-router';

const NewPlace = () => {
const {isLoading,error,sendRequest,clearError}=useHttpClient() 
const auth= useContext(AuthContext)
const history = useHistory()
const [formState,inputHandler]=useForm({
  title: {
    value: '',
    isValid: false
  },
  description: {
    value: '',
    isValid: false
  },
  address: {
    value: '',
    isValid: false
  }
},false)
  
  const placeSubmitHandler=async(event)=>{
    event.preventDefault()
    try {
      await sendRequest(
        'http://localhost:5001/api/places',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator:auth.userId
        }),
        {
          'Content-Type': 'application/json'
        }
      );
     history.push('/')
    } catch (err) {}
  }
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
