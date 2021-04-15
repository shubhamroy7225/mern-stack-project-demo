import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { AuthContext } from "../../shared/components/context/auth-context";
import Button from "../../shared/components/FormElements/Button/Button";
import UserUpdateProfile from "../../shared/components/FormElements/ImageUpload/UpdateUserProfie";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/components/hooks/form-hook";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/components/util/validators";
const UpdatePassword = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [passwordData,setPasswordData] = useState()
  // const [formState, inputHandler, setFormData] = useForm(
  //   {
  //     password: {
  //       value: "",
  //       isValid: false,
  //     }
  //   },
  //   false
  // );

  const updatePassword = (event)=>{
    setPasswordData(event.target.value)
}
  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}/password`,
        "PATCH",
        JSON.stringify({
          id:auth.userId,
          password: passwordData,
        }),
        {
          "Content-Type": "application/json",
           Authorization:auth.token
        }
      );
      history.push("/users");
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
  
  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <Card>
        <form
          action=""
          className="place-form"
          onSubmit={placeUpdateSubmitHandler}
        >
          <input type="text" id="password" name="password" onChange={updatePassword}></input>
          
          {/* <Input
            element="input"
            id="password"
            type="text"
            label="Change Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          /> */}
         <Button type="submit" >
            UPDATE PASSWORD
          </Button>
        </form>
      </Card>
    </>
  );
};
export default UpdatePassword;
