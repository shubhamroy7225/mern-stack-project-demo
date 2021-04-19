import React, { useContext, useEffect, useState } from "react";
import { store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
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
import Backdrop from "../../shared/Backdrop/Backdrop";
import "./UpdatePassword.css"
const UpdatePassword = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [passwordData,setPasswordData] = useState()
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
      store.addNotification({
        title: "Wonderful!",
        message: "Password Updated Successfully",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
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
      
      <div className="place-item">
      <Backdrop/>
      <center>
        <form
          action=""
          className="place-form"
          onSubmit={placeUpdateSubmitHandler}
        >
          <label for="password">Update Password</label><br/>
          <input type="text" id="password" name="password" onChange={updatePassword}></input>
          <br/><br/>
         <Button type="submit" >
            UPDATE PASSWORD
          </Button>
        </form>
        </center>
        </div>
        
     
    </>
  );
};
export default UpdatePassword;
