import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router";
const Backdrop = () => {
  const history = useHistory();
  const handleBackdrop = () => {
    history.goBack();
  };
  return (
    <div>
      <ArrowBackIcon onClick={handleBackdrop} />
    </div>
  );
};

export default Backdrop;
