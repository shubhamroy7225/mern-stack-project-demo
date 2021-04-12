import React, { useContext, useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/components/util/validators";
import "./FormPlace.css";
import { useForm } from "../../shared/components/hooks/form-hook";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import { AuthContext } from "../../shared/components/context/auth-context";
import { useHistory } from "react-router";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import MultipleImageUpload from "../../shared/components/FormElements/ImageUpload/MultipleImagesUpload";

const NewPlace = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [selectedFile, setSelectedFile] = useState();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [formState, inputHandler] = useForm(
    {
      category: {
        value: "1",
        isValid: false,
      },
      title: {
        value: "",
        isValid: false,
      },
      yourexprience: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      state: {
        value: "",
        isValid: false,
      },
      country: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const onChangeHandler = (event) => {
    console.log(event.target.files);
    setSelectedFile(event.target.files);
  };

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("category", formState.inputs.category.value);
      formData.append("title", formState.inputs.title.value);
      for (var x = 0; x < selectedFile.length; x++) {
        formData.append("file", selectedFile[x]);
      }
      formData.append("yourexprience", formState.inputs.yourexprience.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("city", formState.inputs.city.value);
      formData.append("state", formState.inputs.state.value);
      formData.append("country", formState.inputs.country.value);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/places",
        "POST",
        formData,
        {
          Authorization: auth.token,
        }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}

        <Input
          id="category"
          element="select"
          type="text"
          label="Pick your favorite flavor:"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please select category."
          onInput={inputHandler}
          placeholder="Pick your category..."
        >
          <option value="" disabled selected hidden>
            Choose your place category
          </option>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </Input>

        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <MultipleImageUpload
          id="image"
          onChangeHandler={onChangeHandler}
          errorText="Please propvide an image"
        />
        <Input
          id="yourexprience"
          element="textarea"
          label="Your Exprience"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter at least 5 characters."
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
        <Input
          id="city"
          element="input"
          type="text"
          label="City"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid city."
          onInput={inputHandler}
        />
        <Input
          id="state"
          element="input"
          type="text"
          label="State"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid state."
          onInput={inputHandler}
        />
        <Input
          id="country"
          element="select"
          type="text"
          label="Pick your Country:"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please select country."
          onInput={inputHandler}
        >
          <option value="" disabled selected hidden>
            Choose your country
          </option>
          <option value="grapefruit">India</option>
          <option value="lime">USA</option>
          <option value="coconut">UK</option>
          <option value="mango">Aus</option>
        </Input>
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};
export default NewPlace;
