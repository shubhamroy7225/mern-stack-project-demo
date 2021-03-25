import React from 'react';
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button/Button'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from '../../shared/components/util/validators';
import '../../places/pages/FormPlace.css';
import { useForm } from '../../shared/components/hooks/form-hook';



const Signin = () => {
 
const [formState,inputHandler]=useForm({
 email: {
    value: '',
    isValid: false
  },
  password: {
    value: '',
    isValid: false
  }
},false)
  
  const placeSubmitHandler=(event)=>{
    event.preventDefault()
    console.log(formState.inputs)
  }
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="email"
        element="input"
        type="email"
        label="Email"
        validators={[VALIDATOR_EMAIL()]}
        errorText="Please enter a valid email."
        onInput={inputHandler}
      />
      <Input
        id="password"
        element="input"
        type='text'
        label="Password"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid password (at least 5 characters)."
        onInput={inputHandler}
      />
     
      <Button type="submit" disabled={!formState.isValid}>
        LOGIN
      </Button>
    </form>
  );
};

export default Signin;
