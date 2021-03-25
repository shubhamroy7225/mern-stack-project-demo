import React, { useState } from "react";
import Card from "../../shared/components/UIElements/Card/Card";
import Input from "../../shared/components/FormElements/Input";
import "./Auth.css";
import { useForm } from "../../shared/components/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";
import Button from "../../shared/components/FormElements/Button/Button";
const Auth = () => {
    const [isLoginMode,setIsLoginMode]=useState(true)
  const [formState, inputHandler,setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
      if(!isLoginMode){
          setFormData({
              ...formState.inputs,
              name:undefined
          },formState.inputs.email.isValid && formState.inputs.password.isValid)
      }else{
        setFormData({
            ...formState.inputs,
            name: {
                value: "",
                isValid: false,
              },
        },false)
      }
  setIsLoginMode(prevmode=>!prevmode)
  };
  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  return (
    <Card className="authentication">
      <h2
        style={{
          color: "#ff0055",
        }}
      >
        LOGIN REQUIRED
      </h2>
      <hr />
      <form action="" onSubmit={authSubmitHandler}>
          {!isLoginMode&&<Input
          id="name"
          element="input"
          type="text"
          label="User Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="User name can not be null"
          onInput={inputHandler}
        />}
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="Password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password (at least 5 characters)."
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
         {isLoginMode?'LOGIN':'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode?'SIGNUP':'LOGIN'}
        </Button>
    </Card>
  );
};

export default Auth;
