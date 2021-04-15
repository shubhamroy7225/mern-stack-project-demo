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
import { VALIDATOR_REQUIRE } from "../../shared/components/util/validators";
const UserProfile = () => {
  const history = useHistory();
  const [user, setUser] = useState();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      id: {
        value: "",
        isValid: true,
      },
      name: {
        value: "",
        isValid: false,
      },
      image: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  useEffect(() => {
    if (auth.userId) {
      const getUserByUserId = async () => {
        try {
          const response = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}`,
            "GET"
          );
          //setPlaceData(response.image);
          console.log(response);
          setUser(response);
          setFormData(
            {
              id: {
                value: auth.userId,
                isValid: true,
              },
              name: {
                value: response.name,
                isValid: true,
              },
              image: {
                value: null,
                isValid: true,
              },
            },
            true
          );
        }catch (err) {}
      };
      getUserByUserId();
    }
  }, [sendRequest, auth.userId]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", formState.inputs.id.value);
      formData.append("name", formState.inputs.name.value);
   
        formData.append("image", formState.inputs.image.value);
      
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}`,
        "PATCH",
        formData
      );
      store.addNotification({
        title: "Wonderful!",
        message: "Place Updated Successfully",
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
  if (!user) {
    return (
      <div className="center">
        <Card>
          <h2>No places found.</h2>
        </Card>
      </div>
    );
  }
  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <center> <div className="place-item">
      <Card>
        <form
          action=""
          className="place-form"
          onSubmit={placeUpdateSubmitHandler}
        >
          <UserUpdateProfile
            id="image"
            errorText="Please propvide an image"
            imageUrl={`${process.env.REACT_APP_ASSET_URL}/${user.image}`}
            onInput={inputHandler}
          />
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={user.name}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PROFILE
          </Button>
        </form>
      </Card>
      </div>
      </center>
    </>
  );
};
export default UserProfile;
